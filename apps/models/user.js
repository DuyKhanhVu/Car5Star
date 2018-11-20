var db = require("../common/database");

var conn = db.getConnection();

var q = require("q");

function addUser(user){
    if (user){
        var defer = q.defer();
        var query = conn.query('INSERT INTO user SET ?', user, function(err, result){
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
module.exports = {
    addUser : addUser
}