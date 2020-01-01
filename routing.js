const server = require('http').createServer();
const io = require('socket.io')(server)
const port = 100;
module.exports = {
    StartListen: function(){
        io.on('connection',function (socket){
            console.log("New Connection");
            let num = 1;
            setInterval(() => {
                socket.emit('relocatePlayer',{x:num,y:32});
                num+= 1;
                
            }, 1000/300);
           
            socket.on('disconnect',()=>{
                console.log("Client Disconnect");
                
            });
        });
        server.listen(port);
        console.log("Listening on port",port);
        
    }

}