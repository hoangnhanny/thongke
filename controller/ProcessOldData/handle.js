const { SearchUrlSub } = require("../EsMain/StatisSub");
const { v4: uuidv4 } = require("uuid");
const { saveData, searchUrlTime } = require("../BuildEsMain");
const { updateView } = require("../EsMain/Statis");
const indexNameSub = "hoangnhan_sub";
const indexName = "hoangnhan";

const flowHandleData = async (data) => {
    return new Promise(async (resolve, reject) => {
        // try {
        const checkUrlSub = SearchUrlSub(data.url);
        checkUrlSub
            .then(async (r) => {
                console.log(r);
                if (r.hits.hits.length === 0) {
                    const bodySub = {
                        index_name_current: "tuoitrecuoi2020",
                        updated_at: new Date(),
                        created_at: new Date(),
                        id: uuidv4(),
                        app_id: data.app,
                        url: data.url,
                    };
                    await saveData(indexNameSub, bodySub);
                    const bodyMain = {
                        app_id: data.app,
                        created_at: Date.parse(data.time),
                        id: uuidv4(),
                        index_name_current: "tuoitrecuoi2020",
                        sub_id: bodySub.id,
                        updated_at: new Date(),
                        url: data.url,
                        view: data.count,
                    };
                    await saveData(indexName, bodyMain);
                    resolve();
                } else {
                    const time = Date.parse(data.time).toString();
                    const url = data.url;
                    const checkUrlMain = searchUrlTime(indexName, url, time);
                    checkUrlMain.then(async (data1) => {
                        if (data1.hits.hits.length === 0) {
                            const bodyMain = {
                                app_id: data.app,
                                created_at: Date.parse(data.time),
                                id: uuidv4(),
                                index_name_current: "tuoitrecuoi2020",
                                sub_id: checkUrlSub.hits.hits[0]._source.id,
                                updated_at: new Date(),
                                url: data.url,
                                view: data.count,
                            };
                            await saveData(indexName, bodyMain);
                        } else {
                            const view = data.count;
                            const { id } = data1.hits.hits[0]._source;
                            await updateView(view, id);
                        }
                    });
                    resolve();
                }
            })
            .catch((err) => {
                reject();
                console.log(err);
            });
        // if (checkUrlSub.hits.hits.length === 0) {
        //     const bodySub = {
        //         index_name_current: "tuoitrecuoi2020",
        //         updated_at: new Date(),
        //         created_at: new Date(),
        //         id: uuidv4(),
        //         app_id: data.app,
        //         url: data.url,
        //     };
        //     await saveData(indexNameSub, bodySub);
        //     const bodyMain = {
        //         app_id: data.app,
        //         created_at: Date.parse(data.time),
        //         id: uuidv4(),
        //         index_name_current: "tuoitrecuoi2020",
        //         sub_id: bodySub.id,
        //         updated_at: new Date(),
        //         url: data.url,
        //         view: data.count,
        //     };
        //     await saveData(indexName, bodyMain);
        // } else {
        //     const time = Date.parse(data.time).toString();
        //     const url = data.url;
        //     const checkUrlMain = await searchUrlTime(indexName, url, time);
        //     if (checkUrlMain.hits.hits.length === 0) {
        //         const bodyMain = {
        //             app_id: data.app,
        //             created_at: Date.parse(data.time),
        //             id: uuidv4(),
        //             index_name_current: "tuoitrecuoi2020",
        //             sub_id: checkUrlSub.hits.hits[0]._source.id,
        //             updated_at: new Date(),
        //             url: data.url,
        //             view: data.count,
        //         };
        //         await saveData(indexName, bodyMain);
        //     } else {
        //         const view = data.count;
        //         const { id } = checkUrlMain.hits.hits[0]._source;
        //         await updateView(view, id);
        //     }
        // }
        // await sleep(1000).then((r) => resolve());
        // } catch (error) {
        //     reject(error);
        //     console.log(error);
        // }
    });
};

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

exports.flowHandleData = flowHandleData;
