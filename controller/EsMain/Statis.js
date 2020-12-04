const { updateEs } = require("../BuildEsMain");

const indexName = "hoangnhan";
const updateView = (view, id) => {
    const body = {
        query: {
            bool: {
                must: [
                    {
                        term: {
                            "id.keyword": id,
                        },
                    },
                ],
            },
        },
        script: {
            lang: "painless",
            source: "ctx._source.view += params.view",
            params: {
                view,
            },
        },
    };
    return updateEs(indexName, body);
};

exports.updateView = updateView;
