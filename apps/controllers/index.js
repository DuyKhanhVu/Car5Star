var express = require("express");

var router = express.Router();

router.use("/admin", require(__dirname + "/admin"));
router.use("/blog", require(__dirname + "/blog"));
router.use("/price-list", require(__dirname + "/price-list"));
router.use("/about", require(__dirname + "/about"));

router.get("/", function(req, res){
    res.json({"message":"This is Home Page"});
});

module.exports = router;