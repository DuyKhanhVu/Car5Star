var db = require("../common/database");

var conn = db.getConnection();

var q = require("q");

function addOrder(order){
    if (order){
        var defer = q.defer();
        var query = conn.query('INSERT INTO orders SET ?', order, function(err, result){
            if(err){
                console.log(err);
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

function getAllOrders(){
    var defer = q.defer();
    var query = conn.query('SELECT * FROM orders', function(err, orders){
        if (err){
            console.log(err);
            defer.reject(err);
        }else{
            defer.resolve(orders);
        }
    });
    return defer.promise;
}

function addNewCar(car){
    if (car){
        var defer = q.defer();
        var query = conn.query('INSERT INTO cars SET ?', car, function(err, result){
            if(err){
                console.log(err);
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

function getAllCars(){
    var defer = q.defer();
    var query = conn.query('SELECT * FROM cars', function(err, cars){
        if (err){
            console.log(err);
            defer.reject(err);
        }else{
            defer.resolve(cars);
        }
    });
    return defer.promise;
}

function getCarById(id){
    if (id){
        var defer = q.defer();
        var query = conn.query('SELECT * FROM cars WHERE ?', {id: id}, function(err, result){
            if (err){
                console.log(err);
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    } 
    return false;
}

module.exports = {
    addOrder : addOrder,
    getAllOrders : getAllOrders,
    addNewCar: addNewCar,
    getAllCars : getAllCars,
    getCarById : getCarById,
}