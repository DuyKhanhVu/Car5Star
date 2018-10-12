var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    res.json({"message":"This is Admin Page"});
});

module.exports = router;