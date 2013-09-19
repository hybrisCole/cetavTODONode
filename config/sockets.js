var _ = require('lodash');

module.exports = function (io) {
  var socket_list = {},
    CETAV_KEY = 'CETAV';
  io.sockets.on('connection', function(socket) {
    socket.join(CETAV_KEY);
    socket.on('chat:registrar',function(nombreUsuario,callback){
      socket.nickname = nombreUsuario;
      callback(true);
      socket_list[socket.nickname] = socket;
      socket.emit('chat:lista',Object.keys(socket_list));
    });
    socket.on('chat:susurro',function(data){
      socket_list[data.usuarioDestinatario].emit('chat:whisper', {cuerpo: data.mensaje, usuario: socket.nickname, fecha: new Date()});
    });
    socket.on('chat:todos',function(data){
      io.sockets.emit('chat:mensaje', {cuerpo: data.mensaje, usuario: data.usuario, fecha: new Date()});
    });
    socket.on('chat:lista',function(callback){
      callback(Object.keys(socket_list));
    });
  });
}
