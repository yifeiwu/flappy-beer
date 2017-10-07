var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname));
app.use("/images", express.static(__dirname + '/images'));
app.use("/scripts", express.static(__dirname + '/scripts'));

// viewed at based directory http://localhost:8080/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'views/index.html'));
});

app.listen(process.env.PORT || 8080);


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