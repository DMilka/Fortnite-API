const mongoose = require('mongoose');

const player = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nickname: String,
  link: String,
  query_date: String
});

module.exports = mongoose.model('socials',player);