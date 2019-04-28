var express = require('express');
var socket = require('socket.io');

var app = express();

app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function(){
    console.log('Listening to request on port 4000');
});

// static file
app.use(express.static('public'));


// socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('Connected!!', socket.id);
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });
    socket.on('typing', function(data){
        socket.broadcast.emit("typing", data);
    });
});
