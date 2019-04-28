// make connection

var socket = io.connect('http://localhost:4000');

// query dom
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
      feedback = document.getElementById('feedback');

// emmit events

btn.addEventListener('click', function(e){
    feedback.innerHTML =''
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    
});

message.addEventListener('keypress', function(e){
    socket.emit('typing',handle.value);
});


// listen for events
socket.on('chat', function(data){
    output.innerHTML += `<p><strong>${data.handle}</strong>${data.message}</p>`
})

socket.on('typing', function(data){
    feedback.innerHTML = `<p><em>${data} is typing..</em></p>`
})
