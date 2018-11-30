var db = require("../common/database");

var conn = db.getConnection();

var q = require("q");

function addNewPost(post){
    if (post){
        var defer = q.defer();
        var query = conn.query('INSERT INTO blog SET ?', post, function(err, result){
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
    addNewPost: addNewPost
}