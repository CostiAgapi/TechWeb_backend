'use strict';
module.exports = function(app) {
  var userController = require('../controllers/userController');

  // todoList Routes
  app.route('/test').get(userController.testRequest);

  app.route('/login').post(userController.login);
  
  app.route('/create').post(userController.createAcount);
};
