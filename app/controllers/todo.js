/*
 * Crear Puesto Trabajo
 */
var mongoose = require('mongoose'),
  Todo = mongoose.model('Todo');

exports.add = function(req, res){
  var todo = new Todo(req.body);
  todo.save(function(err){
    var response = {status:'OK'};
    if (err) {var response = {status:'FAIL'};}
    return res.json(response);
  });
};

exports.findAll = function(req, res){
  Todo.list({},function(err,todos){
    if (err) {return res.render('500');}
    res.json(todos);
  });
};

exports.findById = function(req, res){
  Todo.findById(req.params.id, function (err, todo) {
    if (err) {return res.render('500');}
    res.json(todo);
  });
};

exports.update = function(req,res){

  Todo.findById(req.params.id, function (err, todo) {
    if (err) {return res.render('500');}
    todo.nombre = req.body.nombre;
    todo.status = req.body.status;
    todo.save(function (err) {
      if (err) {return res.render('500');}
      res.json(todo);
    });
  });
};

exports.delete = function(req,res){
  Todo.findByIdAndRemove(req.params.id, function (err) {
    if (err) {return res.render('500');}
    res.json({status:'OK'});
  });
};