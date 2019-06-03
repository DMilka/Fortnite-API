const mongoose = require('mongoose');

const player = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nickname: String,
  solo: Object,
  duo: Object,
  squad: Object,
  query_date: String
});

module.exports = mongoose.model('statistic_by_nickname',player);