const stream = (socket)=>{
    socket.on('subscribe', (data)=>{
        //subscribe/join a room
        socket.join(data.room);
        socket.join(data.socketId);

        //Inform other members in the room of new user's arrival
        if(socket.adapter.rooms[data.room].length > 1){
            socket.to(data.room).emit('new user', {socketId:data.socketId , user: data.username});
        }
    });


    socket.on('newUserStart', (data)=>{
        socket.to(data.to).emit('newUserStart', {sender:data.sender,user:data.user});
    });


    socket.on('sdp', (data)=>{
        socket.to(data.to).emit('sdp', {description: data.description, sender:data.sender});
    });


    socket.on('ice candidates', (data)=>{
        socket.to(data.to).emit('ice candidates', {candidate:data.candidate, sender:data.sender});
    });

    socket.on('base64 file', function (msg) {
        console.log("hello");
      console.log('received base64 file from' + msg.username);
      socket.username = msg.username;
      // socket.broadcast.emit('base64 image', //exclude sender
      io.sockets.emit('base64 file',  //include sender
  
          {
            username: socket.username,
            file: msg.file,
            fileName: msg.fileName
          }
  
      );
    });
    socket.on('chat', (data)=>{
        socket.to(data.room).emit('chat', {sender: data.sender, msg: data.msg});
    });

    socket.on('typingMsg',(data)=>{
        socket.to(data.room).emit('typingMsg',data);
    })
}

module.exports = stream;