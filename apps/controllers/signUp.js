var express = require("express");
var router = express.Router();

var user_md = require("../models/user");

router.get("/", function (req, res) {
    res.render("signUp", { data: {} });
});

router.post("/", function (req, res) {
    var user = req.body;
    if (user.username.trim().length == 0) {
        res.render("signUp", { data: { error: "Username is required" } });
    }
    if (user.password != user.confirmpassword && user.password.trim().length != 0) {
        res.render("signUp", { data: { error: "Password is not match" } });
    }
    //Insert to DB
    user = {
        username: user.username,
        password: user.password
    };

    var result = user_md.addUser(user);
    if (!result) {
        res.render("signUp", { data: { error: "Could not insert user data to db" } });
    } else {
        res.redirect("login");
    }
});
module.exports = router;