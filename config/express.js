var express = require('express')
  , mongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash');

module.exports = function(app,config){
  app.set('showStackError', true);

  app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }));
  app.use(express.static(config.root + '/public'));

  if(process.env.NODE_ENV !== 'test'){
    app.use(express.logger('dev'));
  }

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  //CORS middleware
  var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
  }

  app.configure(function () {
    //El orden de llamados de todo lo que hay aqui es muy importante D: D: D:
    app.use(express.bodyParser());
    //CORS y evitando el metodo OPTIONS
    app.use(allowCrossDomain);
    app.use(express.cookieParser('C3T1V'));
    app.use(express.methodOverride());
    app.use(express.session({
      secret: 'C3T1V',
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));

    app.use(flash());

    app.use(app.router);

    app.use(function(err, req, res, next){
      if (~err.message.indexOf('not found')){
        return next();
      }

      console.error(err.stack);

      res.status(500).render('500', { error: err.stack });
    });

    app.use(function(req, res, next){
      res.status(404).render('404', { url: req.originalUrl, error: 'Not found' })
    });
  });
}