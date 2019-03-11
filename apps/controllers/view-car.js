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

router.post("/", function (req, res) {
    var params = req.body;
    console.log(req.body);
    car = {
        seating: params.seating,
        brand: params.brand, 
        price: params.price,
    };
    var data = car_md.searchCar(car);
    if (data) {
        data.then(function (cars) {
            var dataRender = {
                cars: cars,
                error: false
            };
            res.render("view-car/view-car", { data: dataRender });
        }).catch(function (error) {
            res.render("view-car/view-car", { error: true });
        });
    } else {
        res.render("view-car/review-car", { data: data });
    }
});

router.get("/order/:id", function (req, res) {
    var params = req.params;
    var id = params.id;
    var data = car_md.getCarById(id);
    if (data) {
        data.then(function (cars) {
            var dataRender = {
                car: cars[0],
                error: false
            };
            res.render("view-car/order", { data: dataRender });
        }).catch(function (error) {
            res.render("view-car/order", { error: true });
        });
    } else {
        res.render("view-car/order", { data: data });
    }
});


router.post("/order", function(req, res){
    var order = req.body;
    console.log(req.body.id);
    if (order.email.trim().length == 0 && order.phone.trim().length == 0) {
        res.render("order", { data: { error: "Please enter an email and phone" } });
    }
    //Insert to DB
    var now = Date();
    order = {
        name: order.name,
        email: order.email,
        phone: order.phone,
        idcar: order.id,
        from: order.from,
        to: order.to,
        note: order.note,
        create_at: now,
        status: false,
    };
    console.log(order);
    var result = car_md.addOrder(order);
    if (!result) {
        res.render("order", { data: { error: "Could not send order" } });
    } else {
        res.redirect("/");
    }
})

module.exports = router;