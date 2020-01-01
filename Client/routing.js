const server = require('http').createServer();
const io = require('socket.io')(server)
const port = 100;
module.exports = {
    StartListen: function () {
        io.on('connection', function (socket) {
            console.log("New Connection");

            //socket.emit("serverStatus",{status :false,msg:"Server is under maintnance"});
            socket.emit('serverStatus', { status: true });


            socket.on('changeAge', (d) => { OnChnageAge(d, socket) })
            socket.on('loginRequest', (d) => { OnLoginRequest(d, socket) })
            socket.on('disconnect', () => {
                console.log("Client Disconnect");

            });
        });
        server.listen(port);
        console.log("Listening on port", port);

    }

}
const OnChnageAge = async function (data, socket) {
    data = JSON.parse(data);
    console.log(data);

    let givenAge = Number(data.age);
    socket.emit("changeAge", { age: givenAge * 2 });
    console.log("Send Changed Age");

}
const OnLoginRequest = async function (data, socket) {
    data = JSON.parse(data);
    let username = data.model.Username + "";
    let password = data.model.Password + "";
    if (username.toLowerCase() == "ofri" && password.toLowerCase() == "123") {
        socket.emit("loginRes", { status: true });

    } else {

        socket.emit("loginRes", { status: false ,msg:"Username or Password is Incorrect"});
    }

}