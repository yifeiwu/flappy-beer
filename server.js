var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

app.get('/controller', function(request, response) {
    response.sendFile(__dirname + '/public/controller.html');
});


io.on('connection', function(socket) {

    setInterval(function() {
        var total = io.engine.clientsCount - 1;
        io.emit('concurrent players', total);
    }, 2000);


    socket.on('chat message', function(msg) {
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('reward', function() {
        socket.broadcast.emit('reward');
    });
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});