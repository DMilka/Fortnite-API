const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  items: Array,
  query_date: String
});

module.exports = mongoose.model('Items',itemsSchema);