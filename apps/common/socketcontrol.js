module.exports = function(io){
    io.sockets.on("connection", function(socket){
        console.log("have a new user connected");

        //Listen send message
        socket.on("client_send_message", function(message){
            // Notify to myself

            var data = {
                sender: "You",
                message: message
            };
            socket.emit("update_message", data);
            var data = {
                sender: "Client",
                message: message
            };
            socket.broadcast.emit("update_message", data);
        });

        socket.on("admin_send_message", function(message){
            // Notify to myself

            var data = {
                sender: "You",
                message: message
            };
            socket.emit("update_message", data);
            var data = {
                sender: "Admin",
                message: message
            };
            socket.broadcast.emit("update_message", data);
        });
    });
}