var express = require("express");
var router = express.Router();

var feedback_md = require("../models/feedback");

router.get("/", function (req, res) {
    res.render("feedback", { data: {} });
});

router.post("/", function (req, res) {
    var feedback = req.body;
    if (feedback.email.trim().length == 0) {
        res.render("feedback", { data: { error: "Please enter an email" } });
    }
    //Insert to DB
    var now = Date();
    feedback = {
        name: feedback.name,
        email: feedback.email,
        phone: feedback.phone,
        content: feedback.content,
        create_at: now,
    };

    var result = feedback_md.addFeedback(feedback);
    if (!result) {
        res.render("feedback", { data: { error: "Could not send feedback" } });
    } else {
        res.redirect("view-car");
    }
});
module.exports = router;