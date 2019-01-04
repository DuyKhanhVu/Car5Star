var express = require("express");
var multer = require('multer');
var path = require('path');

var router = express.Router();
var blog_md = require("../models/blogAdmin");
var feedback_md = require("../models/feedback");
var car_md = require("../models/car");

//Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/upload/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
})

//#region Init Upload
const upload = multer({
    storage: storage
}).single('myImage');


router.get("/", function (req, res) {
    var data = car_md.getAllOrders();
    data.then(function (orders) {
        var dataRender = {
            orders: orders,
            error: false,
        };
        res.render("admin/admin", { data: dataRender });
    }).catch(function (err) {
        res.render("admin/admin", { data: { error: true } });
    });
});
//#endregion

//chat
router.get("/adminchat", function (req, res) {
    res.render("admin/adminchat");
});

//#region blog admin
router.get("/blog-manager", function (req, res) {
    var data = blog_md.getAllPost();
    data.then(function (posts) {
        var dataRender = {
            posts: posts,
            error: false,
        };
        res.render("admin/adminblog/blog-manager", { data: dataRender });
    }).catch(function (err) {
        res.render("admin/adminblog/blog-manager", { data: { error: true } });
    });
});

router.get("/blog-manager/addnew", function (req, res) {
    res.render("admin/adminblog/addnew", { data: {} });
});

router.post("/blog-manager/addnew", function (req, res) {
    var params = req.body;
    if (params.author.trim().length == 0) {
        res.render("admin/adminblog/addnew", { data: { error: "Please enter a author" } });
    } else if (params.title.trim().length == 0) {
        res.render("admin/adminblog/addnew", { data: { error: "Please enter a title" } });
    }
    post = {
        author: params.author,
        title: params.title,
        content: params.content
    };
    var result = blog_md.addNewPost(post);
    if (!result) {
        res.render("admin/adminblog/addnew", { data: { error: "Could not insert post data to db" } });
    } else {
        res.redirect("/admin/blog-manager");
    }
});

router.get("/blog-manager/edit/:id", function (req, res) {
    var params = req.params;
    var id = params.id;
    var data = blog_md.getPostById(id);

    if (data) {
        data.then(function (posts) {
            var dataRender = {
                post: posts[0],
                error: false
            };
            res.render("admin/adminblog/edit", { data: dataRender });
        }).catch(function (error) {
            res.render("admin/adminblog/edit", { error: true });
        });
    } else {
        res.render("admin/adminblog/edit", { data: data });
    }
});

router.put("/blog-manager/edit", function (req, res) {
    var params = req.body;
    data = blog_md.updatePost(params);

    if (!data) {
        res.json({ status_code: 500 });
    } else {
        data.then(function (result) {
            res.json({ status_code: 200 });
        }).catch(function (err) {
            res.json({ status_code: 500 });
        });
    }
});

router.delete("/blog-manager/delete", function (req, res) {
    var id = req.body.id;
    var data = blog_md.deletePost(id);
    if (!data) {
        res.json({ status_code: 500 });
    } else {
        data.then(function (result) {
            res.json({ status_code: 200 });
        }).catch(function (err) {
            res.json({ status_code: 500 });
        });
    }
});
//#endregion

//#region car admin
router.get("/car-manager", function (req, res) {
    var data = car_md.getAllCars();
    data.then(function (cars) {
        var dataRender = {
            cars: cars,
            error: false,
        };
        res.render("admin/admincar/car-manager", { data: dataRender });
    }).catch(function (err) {
        res.render("admin/admincar/car-manager", { data: { error: true } });
    });
});

router.get("/car-manager/add-car", function (req, res) {
    res.render("admin/admincar/add-car", { data: {} });
});

router.post("/car-manager/add-car", function (req, res) {
    upload(req, res, (err) => {
        var params = req.body;
        car = {
            name: params.name,
            imageUrl: 'upload/' + req.file.filename,
            brand: params.brand,
            exterior_color: params.exterior_color,
            seating: params.seating,
            price: params.price,
            status: false,
        };
        var result = car_md.addNewCar(car);
        if (!result) {
            res.render("admin/adminblog/addnew", { data: { error: "Could not insert post data to db" } });
        } else {
            res.redirect("/admin/car-manager");
        }
    });
});

router.get("/car-manager/update-car/:id", function (req, res) {
    var params = req.params;
    var id = params.id;
    var data = car_md.getCarById(id);

    if (data) {
        data.then(function (cars) {
            var dataRender = {
                car: cars[0],
                error: false
            };
            res.render("admin/admincar/update-car", { data: dataRender });
        }).catch(function (error) {
            res.render("admin/admincar/update-car", { error: true });
        });
    } else {
        res.render("admin/admincar/update-car", { data: data });
    }
});

router.put("/car-manager/update-car", function (req, res) {
    var params = req.body;
    data = car_md.updateCar(params);

    if (!data) {
        res.json({ status_code: 500 });
    } else {
        data.then(function (result) {
            res.json({ status_code: 200 });
        }).catch(function (err) {
            res.json({ status_code: 500 });
        });
    }
});

router.delete("/car-manager/delete", function (req, res) {
    var id = req.body.id;
    var data = car_md.deleteCar(id);
    if (!data) {
        res.json({ status_code: 500 });
    } else {
        data.then(function (result) {
            res.json({ status_code: 200 });
        }).catch(function (err) {
            res.json({ status_code: 500 });
        });
    }
});

//#endregion

//feedback
router.get("/adminfeedback", function (req, res) {
    var data = feedback_md.getAllFeedback();
    data.then(function (feedbacks) {
        var dataRender = {
            feedbacks: feedbacks,
            error: false,
        };
        res.render("admin/adminfeedback", { data: dataRender });
    }).catch(function (err) {
        res.render("admin/adminfeedback", { data: { error: true } });
    });
});

module.exports = router;