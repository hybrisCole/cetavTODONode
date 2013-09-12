var _ = require('lodash');

module.exports = function (io) {
  var socket_list = {};
  io.sockets.on('connection', function(socket) {
    socket.on('chat:registrar',function(nombreUsuario,callback){
      if(_.contains(socket_list,nombreUsuario)){
        callback(false);
      }else{
        callback(true);
        socket.nickname = nombreUsuario;
        socket_list[socket.nickname] = socket;
      }
    });
    socket.on('chat:susurro',function(data){
      socket_list[data.usuarioDestinatario].emit('chat:whisper', {cuerpo: data.mensaje, usuario: socket.nickname});
    });
    socket.on('chat:todos',function(data){
      io.sockets.emit('chat:mensaje', {cuerpo: data.mensaje, usuario: data.usuario});
    });
  });
}
