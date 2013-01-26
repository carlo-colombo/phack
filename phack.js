#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(process.cwd())));
});

app.locals.photos = (function (){
    var regex = /\.(jpg|gif|png|jpeg)/i;
    return require('fs')
        .readdirSync(process.cwd())
        .filter(function(filename){
            return regex.test(filename)
        })
})();

app.configure('development', function(){
  app.use(express.errorHandler());
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
});

app.get('/', routes.index);
app.get('/p/:photo', routes.phack);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
