var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    res.render("admin/admin");
});

router.get("/blog-manager", function(req, res){
    res.render("admin/blog-manager");
});

module.exports = router;