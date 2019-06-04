const mongoose = require('mongoose');

const rankByCountrySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: String,
  country: String,
  rank: Array,
  query_date: String
});

module.exports = mongoose.model('RankByCountry',rankByCountrySchema);