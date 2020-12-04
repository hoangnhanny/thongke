const { handleData } = require("../convert/convertData");
const { getData, getCount } = require("../ESAccess/Access");
const { flowHandleData } = require("./handle");

const runProcess = async () => {
    const total = await getCount();
    for (let index = 0; index < total; index = index + 50) {
        const listData = await getData(index);
        const listDataCount = await handleData(listData);
        for (const item of listDataCount) {
            await flowHandleData(item);
        }
        console.log(" Run " + " " + `${index}` + " " + "done!");
    }
    console.log("Run process done !");
};

exports.runProcess = runProcess;
