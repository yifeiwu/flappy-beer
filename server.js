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




var connnections = 0;

io.on('connection', function(socket) {
    var total = io.engine.clientsCount;
    console.log(total + ' connections');
    io.emit('concurrent players', total);

    socket.on('chat message', function(msg) {
        socket.broadcast.emit('chat message', msg);
    });
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});