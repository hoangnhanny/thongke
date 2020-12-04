const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
    host: "http://localhost:9200",
});
client.ping((err) => {
    if (err) {
        console.log("Can't connect to Elasticsearch!");
    } else {
        console.log("Connect to Elasticsearch success !");
    }
});

module.export = client;
