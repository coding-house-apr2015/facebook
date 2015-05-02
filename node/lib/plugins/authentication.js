'use strict';

exports.register = function(server, options, next){

  var authenticate = {
    key: process.env.FIREBASE_JWT,
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

  server.expose({authenticate: authenticate});
  return next();
};

exports.register.attributes = {
  name: 'authentication'
};
