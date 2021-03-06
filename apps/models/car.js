var db = require("../common/database");

var conn = db.getConnection();

var q = require("q");

function addOrder(order) {
    if (order) {
        var defer = q.defer();
        var query = conn.query('INSERT INTO orders SET ?', order, function (err, result) {
            if (err) {
                console.log(err);
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

function getAllOrders() {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM orders', function (err, orders) {
        if (err) {
            console.log(err);
            defer.reject(err);
        } else {
            defer.resolve(orders);
        }
    });
    return defer.promise;
}

function addNewCar(car) {
    if (car) {
        var defer = q.defer();
        var query = conn.query('INSERT INTO cars SET ?', car, function (err, result) {
            if (err) {
                console.log(err);
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

function getAllCars() {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM cars', function (err, cars) {
        if (err) {
            console.log(err);
            defer.reject(err);
        } else {
            defer.resolve(cars);
        }
    });
    return defer.promise;
}

function getCarById(id) {
    if (id) {
        var defer = q.defer();
        var query = conn.query('SELECT * FROM cars WHERE ?', { id: id }, function (err, result) {
            if (err) {
                console.log(err);
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

function updateCar(params) {
    if (params) {
        var defer = q.defer();
        var query = conn.query('UPDATE cars SET name = ?, brand = ?, exterior_color = ?, seating = ?, price = ?, description = ? WHERE id = ?',
            [params.name, params.brand, params.exterior_color, params.seating, params.price, params.description, params.id],
            function (err, result) {
                if (err) {
                    console.log(err);
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            });
        return defer.promise;
    }
    return false;
}

function deleteCar(id) {

    var defer = q.defer();
    var query = conn.query('DELETE FROM cars WHERE ?', { id: id }, function (err, result) {
        if (err) {
            console.log(err);
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });
    return defer.promise;
}

function searchCar(car) {
    if (car) {
        const min = car.price == '1' ? 3000000 : (car.price == '2' ? 5000000 : 10000000);
        const max = car.price == '1' ? 5000000 : (car.price == '2' ? 10000000 : 1000000000);

        var defer = q.defer();
        var query = conn.query('SELECT * FROM cars WHERE brand = ? and seating = ? and price >= ? and price <= ?', 
            [car.brand, car.seating, min, max], function (err, result) {
            if (err) {
                console.log(err);
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

module.exports = {
    addOrder: addOrder,
    getAllOrders: getAllOrders,
    addNewCar: addNewCar,
    getAllCars: getAllCars,
    getCarById: getCarById,
    updateCar: updateCar,
    deleteCar: deleteCar,
    searchCar: searchCar,
}