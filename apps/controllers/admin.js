var express = require("express");

var router = express.Router();
var blog_md = require("../models/blogAdmin");

router.get("/", function(req, res){
    res.render("admin/admin",{data:{}});
});

router.get("/blog-manager", function(req, res){
    res.render("admin/adminblog/blog-manager", {data:{}});
});

router.get("/blog-manager/addnew", function(req, res){
    res.render("admin/adminblog/addnew",{data:{}});
});

router.post("/blog-manager/addnew", function(req, res){
    var params = req.body;
    console.log(params);
    if (params.author.trim().length == 0){
        res.render("admin/adminblog/addnew", {data: {error:"Please enter a author"}});
    }else if (params.title.trim().length == 0){
        res.render("admin/adminblog/addnew", {data:{error:"Please enter a title"}});
    }
    post = {
        author: params.author,
        title: params.title,
        content: params.content
    };
    var result = blog_md.addNewPost(post);
    if (!result){
        res.render("admin/adminblog/addnew", {data:{error:"Could not insert post data to db"}});
    }else{
        res.redirect("/admin/blog-manager");
    }
});
module.exports = router;