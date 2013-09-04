module.exports = function (app) {

  var todo = require('../app/controllers/todo');

  app.get('/todo', todo.findAll);
  app.get('/todo/:id', todo.findById);
  app.post('/todo', todo.add);
  app.put('/todo/:id', todo.update);
  app.delete('/todo/:id', todo.delete);

}