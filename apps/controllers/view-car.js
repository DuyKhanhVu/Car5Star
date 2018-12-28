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
    var params = req.params;
    var id = params.id;
    var data = car_md.getCarById(id);
    if (data) {
        data.then(function (cars) {
            var dataRender = {
                car: cars[0],
                error: false
            };
            res.render("view-car/review-car", { data: dataRender });
        }).catch(function (error) {
            res.render("view-car/review-car", { error: true });
        });
    } else {
        res.render("view-car/review-car", { data: data });
    }
});

router.get("/order", function (req, res) {
    res.render("view-car/order");
});

module.exports = router;