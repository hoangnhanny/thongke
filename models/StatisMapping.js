const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
    host: "http://localhost:9200",
});
const { mappingIndex } = require("../controller/BuildEsMain");
const indexName = "hoangnhan";

const mappingStatis = async () => {
    const checkIndex = await client.indices.exists({ index: indexName });
    if (!checkIndex) {
        await client.indices.create({ index: indexName });
        const body = {
            _doc: {
                properties: {
                    app_id: {
                        fielddata: true,
                        fields: {
                            keyword: {
                                ignore_above: 256,
                                type: "keyword",
                            },
                        },
                        type: "text",
                    },
                    created_at: {
                        fielddata: true,
                        fields: {
                            keyword: {
                                ignore_above: 256,
                                type: "keyword",
                            },
                        },
                        type: "text",
                    },
                    url: {
                        fielddata: true,
                        fields: {
                            keyword: {
                                ignore_above: 256,
                                type: "keyword",
                            },
                        },
                        type: "text",
                    },
                    id: {
                        fielddata: true,
                        fields: {
                            keyword: {
                                ignore_above: 256,
                                type: "keyword",
                            },
                        },
                        type: "text",
                    },
                    index_name_current: {
                        fielddata: true,
                        fields: {
                            keyword: {
                                ignore_above: 256,
                                type: "keyword",
                            },
                        },
                        type: "text",
                    },
                    updated_at: {
                        fielddata: true,
                        fields: {
                            keyword: {
                                ignore_above: 256,
                                type: "keyword",
                            },
                        },
                        type: "text",
                    },
                    view: {
                        type: "long",
                    },
                },
            },
        };
        return await mappingIndex(indexName, body);
    }
};

exports.mappingStatis = mappingStatis;
