var express = require('express'),
  router = express.Router();

require('../routers/namespace')(router);

module.exports = function (app) {
  app.use('/namespaces', router);
};
