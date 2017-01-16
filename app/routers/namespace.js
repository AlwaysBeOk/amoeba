const Namespace = require('../models/namespace');

module.exports = function (router) {

  router.get('/', function (req, res) {
    Namespace.find(function (err, namespaces) {
      if (err) {
        res.status(500).end();
      } else {
        res.json(namespaces);
      }
    });
  });

  router.post('/', function (req, res) {
    var namespace = new Namespace(req.body);
    if (namespace.name != null && namespace.name.length > 0) {
      namespace.save(function (err, namespace) {
        if (err) {
          res.status(500).end();
        } else {
          res.json(namespace);
        }
      })
    } else {
      res.status(400).end();
    }
  });
};
