const mongoose = require('mongoose');

const versionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  version: String,
  query_date: String
});

module.exports = mongoose.model('Version',versionSchema);