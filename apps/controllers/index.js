var express = require("express");

var router = express.Router();

router.use("/admin", require(__dirname + "/admin"));
router.use("/blog", require(__dirname + "/blog"));
router.use("/price-list", require(__dirname + "/price-list"));
router.use("/about", require(__dirname + "/about"));
router.use("/login", require(__dirname + "/login"));
router.use("/signUp", require(__dirname + "/signUp"));
router.get("/", function(req, res){
    res.render("home");
});

module.exports = router;