'use strict';

var Joi = require('joi');
var User = require('../../models/user');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/profile',
    config: {
      description: 'Update user profile',
      validate: {
        payload: {
          email: Joi.string().email().required(),
          avatar: Joi.string().uri().required(),
          age: Joi.number().min(13).max(59).required(),
          address: Joi.string(),
          photo: Joi.string(),
          gender: Joi.string().required(),
          birthday: Joi.date().iso().required()
        }
      },
      handler: function(request, reply){
        var user = new User(request.payload);
        user.save(function(err){
          if(err){
            return reply(err).code(400);
          }else{
            return reply(user);
          }
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.update'
};
