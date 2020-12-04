const elasticsearch = require("elasticsearch");
const clientAccess = new elasticsearch.Client({
    host: "http://192.168.60.96:9200",
});
clientAccess.ping((err) => {
    if (err) {
        console.log("Can't connect to Elasticsearch_tracking !");
    } else {
        console.log("Connect to Elasticsearch_tracking success !");
    }
});

module.export = clientAccess;
