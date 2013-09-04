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
    return res.jsonp(response);
  });
};

exports.findAll = function(req, res){
  Todo.list({},function(err,todos){
    if (err) {return res.render('500');}
    res.jsonp(todos);
  });
};

exports.findById = function(req, res){
  Todo.findById(req.params.id, function (err, todo) {
    if (err) {return res.render('500');}
    res.jsonp(todo);
  });
};

exports.update = function(req,res){
  Todo.findByIdAndUpdate(req.body._id,req.body,function(err,numAfected){
    if(err){res.jsonp({error:err})}
    res.jsonp({numAffected:numAffected});
  });
};

exports.delete = function(req,res){
  Todo.findByIdAndRemove(req.params.id, function (err) {
    if (err) {return res.render('500');}
    res.jsonp({status:'OK'});
  });
};