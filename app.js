const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const top10PlayersRoutes = require('./api/routes/top_10_players');
const top10PlayersRoutesByCountry = require('./api/routes/top_10_players_by_country');
const statisticsByNickname = require('./api/routes/statistics_by_nickname');
const items = require('./api/routes/items');
const item = require('./api/routes/item_detail');
const version = require('./api/routes/version');
const socials = require('./api/routes/socials');

mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@node-rest-shop-mklvh.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true
  });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
             'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Authorization', process.env.FORTNIE_KEY)
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();

});

app.use('/top_10_players', top10PlayersRoutes);
app.use('/top_10_players_by_country', top10PlayersRoutesByCountry);
app.use('/statistics_by_nickname', statisticsByNickname);
app.use('/items', items);
app.use('/item_detail', item);
app.use('/version', version);
app.use('/socials', socials);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;