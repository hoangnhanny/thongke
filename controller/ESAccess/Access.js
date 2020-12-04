const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
    host: "http://192.168.60.96:9200",
});
const indexName = "raovat_tracking";

const getCount = async () => {
    const result = await client.count({
        index: indexName,
        body: {
            query: { match_all: {} },
        },
    });
    const { count } = result;
    return count;
};

exports.getCount = getCount;

const getData = async (from) => {
    const response = await client.search({
        index: indexName,
        body: {
            _source: ["created_at", "current_url", "app_id"],
            query: {
                bool: {
                    must: [{ match_all: {} }],
                },
            },
            size: 50,
            from: from,
            sort: [
                {
                    created_at: {
                        order: "desc",
                    },
                },
            ],
        },
    });
    let arr = [];
    response.hits.hits.map((element) => {
        arr.push(element._source);
    });
    return arr;
};

exports.getData = getData;
