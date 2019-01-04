var express = require("express");
var car_md = require("../models/car")

var router = express.Router();

router.use("/admin", require(__dirname + "/admin"));
router.use("/blog", require(__dirname + "/blog"));
router.use("/view-car", require(__dirname + "/view-car"))
router.use("/price-list", require(__dirname + "/price-list"));
router.use("/about", require(__dirname + "/about"));
router.use("/login", require(__dirname + "/login"));
router.use("/signUp", require(__dirname + "/signUp"));
router.use("/feedback", require(__dirname + "/feedback"));
router.get("/", function(req, res){
    var data = car_md.getAllCars();
    data.then(function (cars) {
        var dataRender = {
            cars: cars,
            error: false,
        };

        res.render("home", { data: dataRender });
    }).catch(function (err) {
        res.render("home", { data: { error: true } });
    });
});

router.get("/chat", function(req,res){
    res.render("chat");
})

module.exports = router;