const mongoose = require('mongoose');

const rankSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: String,
  rank: Array,
  query_date: String
});

module.exports = mongoose.model('Rank',rankSchema);