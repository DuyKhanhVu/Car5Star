var db = require("../common/database");

var conn = db.getConnection();

var q = require("q");

function addFeedback(feedback){
    if (feedback){
        var defer = q.defer();
        var query = conn.query('INSERT INTO feedbacks SET ?', feedback, function(err, result){
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

function getAllFeedback(){
    var defer = q.defer();
    var query = conn.query('SELECT * FROM feedbacks', function(err, feedbacks){
        if (err){
            console.log(err);
            defer.reject(err);
        }else{
            defer.resolve(feedbacks);
        }
    });
    return defer.promise;
}

module.exports = {
    addFeedback : addFeedback,
    getAllFeedback : getAllFeedback
}