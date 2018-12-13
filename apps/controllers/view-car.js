var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    res.render("view-car/view-car");
});

router.get("/review-car/:id", function(req, res){
    res.render("view-car/review-car");
})

module.exports = router;