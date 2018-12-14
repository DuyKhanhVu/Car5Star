module.exports = function(io){
    io.sockets.on("connection", function(socket){
        console.log("have a new user connected");

        //Listen send message
        socket.on("send_message", function(message){
            // Notify to myself

            var data = {
                sender: "You",
                message: message
            };
            socket.emit("update_message", data);
        })
    });
}