var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var TodoSchema = new Schema({
  nombre: String,
  status: Boolean
});

TodoSchema.statics = {
  /**
   * Listar Puestos Trabajo
   *
   * @param {Object} options: opciones del find de Mongoose
   * @param {Function} callback: funcion que se llama cuando el find de Mongoose es ejecutado
   * @api private
   */
  list: function (options, callback) {
    var criteria = options.criteria || {};

    console.log(criteria);

    this.find(criteria)
      .sort({'nombre': -1})
      .exec(callback)
  },
  update: function(conditions,update,options,callback){
    this.update(conditions, update, options, callback);
  }
}

mongoose.model('Todo', TodoSchema);