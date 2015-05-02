'use strict';

var Hapi = require('hapi');
var Mongoose = require('mongoose');
var Blipp = require('Blipp');
var Plugins = require('./tools/plunge');
var ServerConfig = require('./config/server.json');

exports.init = function(port, cb){
  var server = new Hapi.Server(ServerConfig);

  server.connection({port: port});
  Mongoose.connect(process.env.MONGO_URL);

  Mongoose.connection.once('open', function(){
    Plugins.push(Blipp);
    server.register(Plugins, function(err){
      if(err){return cb(err);}

      server.auth.strategy('token', 'jwt', true, authenticate);
      server.start(function(err){
        return cb(err, server);
      });
    });
  });
};

var authenticate = {
  key: 'sn6NA8r8MrgzKh5hNBr6Sr7sK2EmYOr7w8CTzc9P',
  validateFunc: function(jwt, cb){
    var now = Date.now();
    var old = jwt.iat * 1000;

    if(now > old){
      cb(null, true, {uid: jwt.d.uid});
    }else{
      cb();
    }
  }
};
