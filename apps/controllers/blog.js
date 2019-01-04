var express = require("express");

var router = express.Router();

var blog_md = require("../models/blogAdmin");

router.get("/", function (req, res) {
    var data = blog_md.getAllPost();
    data.then(function (posts) {
        var dataRender = {
            posts: posts,
            error: false,
        };
        res.render("blog/blog", { data: dataRender });
    }).catch(function (err) {
        res.render("blog/blog", { data: { error: true } });
    });
});

router.get("/read-post/:id", function (req, res) {
    var params = req.params;
    var id = params.id;
    var data = blog_md.getPostById(id);
    if (data) {
        data.then(function (posts) {
            var dataRender = {
                post: posts[0],
                error: false
            };
            res.render("blog/read-post", { data: dataRender });
        }).catch(function (error) {
            res.render("blog/read-post", { error: true });
        });
    } else {
        res.render("blog/read-post", { data: data });
    }
});
module.exports = router;