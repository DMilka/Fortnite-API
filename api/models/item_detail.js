const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  itemid: String,
  name: String,
  price: Number,
  type: String,
  img: String,
  query_date: String
});

module.exports = mongoose.model('Item_detail',itemSchema);