var express = require("express");

var router = express.Router();
var blog_md = require("../models/blogAdmin");

router.get("/", function (req, res) {
    res.render("admin/admin", { data: {} });
});

router.get("/adminchat", function (req, res){
    res.render("admin/adminchat");
})

router.get("/blog-manager", function (req, res) {
    var data = blog_md.getAllPost();
    data.then(function (posts) {
        var dataRender = {
            posts: posts,
            error: false,
        };
        res.render("admin/adminblog/blog-manager", { data: dataRender });
    }).catch(function (err) {
        res.render("admin/adminblog/blog-manager", { data: { error: true } });
    });
});

router.get("/blog-manager/addnew", function (req, res) {
    res.render("admin/adminblog/addnew", { data: {} });
});

router.post("/blog-manager/addnew", function (req, res) {
    var params = req.body;
    console.log(params);
    if (params.author.trim().length == 0) {
        res.render("admin/adminblog/addnew", { data: { error: "Please enter a author" } });
    } else if (params.title.trim().length == 0) {
        res.render("admin/adminblog/addnew", { data: { error: "Please enter a title" } });
    }
    post = {
        author: params.author,
        title: params.title,
        content: params.content
    };
    var result = blog_md.addNewPost(post);
    if (!result) {
        res.render("admin/adminblog/addnew", { data: { error: "Could not insert post data to db" } });
    } else {
        res.redirect("/admin/blog-manager");
    }
});

router.get("/blog-manager/edit/:id", function (req, res) {
    var params = req.params;
    var id = params.id;
    var data = blog_md.getPostById(id);

    if (data) {
        data.then(function (posts) {
            var dataRender = {
                post: posts[0],
                error: false
            };
            res.render("admin/adminblog/edit", { data: dataRender });
        }).catch(function (error) {
            res.render("admin/adminblog/edit", { error: true });
        })
    } else {
        res.render("admin/adminblog/edit", { data: data });
    }
});

router.put("/blog-manager/edit", function (req, res) {
    var params = req.body;
    console.log("admin")
    data = blog_md.updatePost(params);

    if (!data) {
        res.json({ status_code: 500 });
    } else {
        data.then(function (result) {
            res.json({ status_code: 200 });
        }).catch(function (err) {
            res.json({ status_code: 500 });
        });
    }
});

module.exports = router;