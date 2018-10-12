var express = require("express");

var app = express();
var controllers = require(__dirname + "/apps/controllers");

app.use(controllers);

app.listen(3000, function(){
    console.log("Server is running");
});