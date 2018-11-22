var express = require("express");
var router = express.Router();
var helper = require("../helpers/helper");

var user_md = require("../models/user");

router.get("/", function(req, res){
    res.render("login", {data:{}});
});

router.post("/", function(req, res){
    var params = req.body;
    if (params.username.trim().length == 0){
        res.render("login", {data: {error:"Please enter an username"}});
    }else{
        var data = user_md.getUserByUsername(params.username);

        if (data){
            data
                .then(function(users){
                    var user = users[0];
                    var status = helper.compare_password(params.password, user.password);
                    if (status){
                        req.session.user = user;
                        res.redirect("/")
                    } else {
                        res.render("login", {data: {error:"Login wrong, please try again"}});
                    }
                })
                .catch(function(error){
                    console.log(error);
                });
        }else{
            res.render("login", {data: {error:"User not exists"}});
        }
    }
})

module.exports = router;