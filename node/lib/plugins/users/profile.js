'use strict';

var User = require('../../models/user');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/profile',
    config: {
      description: 'Display user profile',
      handler: function(request, reply){
        User.findById(request.auth.credentials._id, function(err, user){
          return reply(user).code(user ? 200 : 400);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.profile'
};
