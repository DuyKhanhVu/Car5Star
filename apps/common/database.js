var config = require("config");
var mysql = require("mysql");

var db_config = {
    host    : config.get("mysql.host"),
    user    : config.get("mysql.user"),
    password: config.get("mysql.password"),
    port    : config.get("mysql.port"),
    database: config.get("mysql.database"),
}

var connection = mysql.createConnection(db_config);

connection.connect();

function getConnection(){
    if (!connection){
        connection.connect();
    }

    return connection;
}

module.exports = {
    getConnection: getConnection
}