'use strict';

var User = require('../models/user');

exports.register = function(server, options, next){

  var authenticate = {
    key: process.env.FIREBASE_SECRET,
    validateFunc: function(jwt, cb){
      var past = jwt.iat * 1000;
      var now = Date.now();
      var future = past + process.env.FIREBASE_EXPIRE * 3600 * 1000;

      if(past < now && now < future){
        User.findOne({uid: jwt.d.uid}, function(err, user){
          cb(null, true, {uid: jwt.d.uid, _id: user ? user._id : null});
        });
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
