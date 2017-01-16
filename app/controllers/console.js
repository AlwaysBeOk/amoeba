var express = require('express'),
  router = express.Router();

require('../routers/console')(router);

module.exports = function (app) {
  app.use('/api', router);
};
