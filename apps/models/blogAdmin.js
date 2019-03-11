var db = require("../common/database");

var conn = db.getConnection();

var q = require("q");

function getAllPost(post){
    var defer = q.defer();
    var query = conn.query('SELECT * FROM blog', function(err, posts){
        if (err){
            console.log(err);
            defer.reject(err);
        }else{
            defer.resolve(posts);
        }
    });
    return defer.promise;
}

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

function getPostById(id){
    var defer = q.defer();
    var query = conn.query('SELECT * FROM blog WHERE ?',{id: id} , function(err, posts){
        if (err){
            console.log(err);
            defer.reject(err);
        }else{
            defer.resolve(posts);
        }
    });
    return defer.promise;
}

function updatePost(params){
    if (params){
        var defer = q.defer();
        var query = conn.query('UPDATE blog SET title = ?, summary = ?, content = ?, author = ? WHERE id = ?',
                    [params.title, params.summary, params.content, params.author, params.id] , 
                    function(err, result){
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

function deletePost(id){
    
    var defer = q.defer();
    var query = conn.query('DELETE FROM blog WHERE ?',{id: id} , function(err, result){
        if (err){
            console.log(err);
            defer.reject(err);
        }else{
            defer.resolve(result);
        }
    });
    return defer.promise;
}
module.exports = {
    getAllPost: getAllPost,
    addNewPost: addNewPost,
    getPostById: getPostById,
    updatePost: updatePost,
    deletePost:deletePost
};