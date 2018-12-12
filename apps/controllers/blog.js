var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    res.render("blog");
});

router.get("/read-post/:id", function(req, res){
    res.render("read-post");
})

module.exports = router;