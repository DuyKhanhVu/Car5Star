//var bcrypt = require("bcrypt");
var config = require("config");

function compare_password(password, dbpassword){
    return (password == dbpassword ? true : false)
}

module.exports = {
    compare_password: compare_password
}