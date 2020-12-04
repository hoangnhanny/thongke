const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
    host: "http://localhost:9200",
});
const mappingIndex = (indexName, body) => {
    return client.indices.putMapping({
        body,
        includeTypeName: true,
        index: indexName,
        type: "_doc",
    });
};

exports.mappingIndex = mappingIndex;

const saveData = (indexName, body) => {
    return client.index({
        body,
        index: indexName,
        type: "_doc",
    });
};

exports.saveData = saveData;

const searchUrlTime = (indexName, url, time) => {
    return client.search({
        index: indexName,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                "created_at.keyword": time,
                            },
                        },
                        {
                            match: {
                                "url.keyword": url,
                            },
                        },
                    ],
                },
            },
        },
    });
};

exports.searchUrlTime = searchUrlTime;

const updateEs = (indexName, body) => {
    return client.updateByQuery({
        body,
        conflicts: "proceed",
        index: indexName,
        type: "_doc",
    });
};

exports.updateEs = updateEs;
