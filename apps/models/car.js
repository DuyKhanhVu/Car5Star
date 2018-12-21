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

module.exports = {
    addOrder : addOrder,
    getAllOrders : getAllOrders
}