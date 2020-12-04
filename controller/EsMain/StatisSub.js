const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
    host: "http://localhost:9200",
});
const indexName = "hoangnhan_sub";

const SearchUrlSub = (url) => {
    return new Promise((resolve, reject) => {
        resolve(
            client.search({
                index: indexName,
                body: {
                    query: {
                        bool: {
                            must: [
                                {
                                    match: {
                                        "url.keyword": url,
                                    },
                                },
                            ],
                        },
                    },
                },
            }),
        );
        reject("Not found");
    });
};
exports.SearchUrlSub = SearchUrlSub;
