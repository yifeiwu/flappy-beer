var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + 'index1.html');
});




var connnections = 0;

io.on('connection', function(socket) {
    var total = io.engine.clientsCount;
    console.log(total + ' connections');
    io.emit('concurrent players', total);

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});