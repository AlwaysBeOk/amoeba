const mongoose = require('mongoose');

const NamespaceSchema = new mongoose.Schema({
  name: { type: String, index: true }
});

const Namespace = mongoose.model('Namespace', NamespaceSchema);

module.exports = Namespace;
