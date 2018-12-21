var express = require("express");

var router = express.Router();

var car_md = require("../models/car");

router.get("/", function(req, res){
    res.render("view-car/view-car");
});

router.get("/review-car/:id", function(req, res){
    res.render("view-car/review-car");
});

router.get("/order", function(req, res){
    res.render("view-car/order");
});

router.post("/order", function(req, res){
    var order = req.body;
    if (order.email.trim().length == 0 && order.phone.trim().length == 0) {
        res.render("order", { data: { error: "Please enter an email and phone" } });
    }
    //Insert to DB
    var now = Date();
    order = {
        name: order.name,
        email: order.email,
        phone: order.phone,
        idcar: 1,
        from: order.from,
        to: order.to,
        note: order.note,
        create_at: now,
        status: false,
    };

    var result = car_md.addOrder(order);
    if (!result) {
        res.render("order", { data: { error: "Could not send order" } });
    } else {
        res.redirect("/");
    }
})

module.exports = router;