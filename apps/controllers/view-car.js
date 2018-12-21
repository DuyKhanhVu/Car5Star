var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    res.render("view-car/view-car");
});

router.get("/review-car/:id", function(req, res){
    res.render("view-car/review-car");
});

router.get("/order", function(req, res){
    res.render("view-car/order");
});

module.exports = router;