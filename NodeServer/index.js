
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name=>{
        console.log("New User", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send', message =>{
        socket.broadcast.emit('recieve',{name: users[socket.id], message: message})
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
});
