var express = require("express");

var router = express.Router();

var car_md = require("../models/car");

router.get("/", function (req, res) {
    var data = car_md.getAllCars();
    data.then(function (cars) {
        var dataRender = {
            cars: cars,
            error: false,
        };
        res.render("view-car/view-car", { data: dataRender });
    }).catch(function (err) {
        res.render("view-car/view-car", { data: { error: true } });
    });
});

router.get("/review-car/:id", function (req, res) {
    res.render("view-car/review-car");
});

router.get("/order", function (req, res) {
    res.render("view-car/order");
});

module.exports = router;