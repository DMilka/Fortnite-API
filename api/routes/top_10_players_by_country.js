const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();


const RankByCountry = require('../models/top_10_players_by_country');


/**
 *
 *    GET REQUEST
 *
 */
router.get('/:country', (req, res, next) => {
  const countryName = req.params.country;

  RankByCountry.find({country: countryName})
    .exec()
    .then( docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
});

// router.get('/:id', (req, res, next) => {
//   const id = req.params.id;
//   RankByCountry.findById(id)
//     .exec()
//     .then( docs => {
//       console.log(docs);
//       // if(docs.length >= 0) {
//         res.status(200).json(docs);
//       // } else {
//       //   res.status(404).json({
//       //     message: 'No data found!'
//       //   })
//       // }

//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       })
//     })
// });


/**
 *
 *  POST REQUEST
 *
 */
router.post('/:country',  (req, res, next) => {
  const country = req.params.country;

   request(`https://fortnitetracker.com/leaderboards/pc/Top1?mode=all&country=${country}`, (err, ress, html) => {
    if(!err && ress.statusCode == 200) {
      const $ = cheerio.load(html);
      const nameTable = [];
      const top10Arr = [];

      $('.trn-table').children('tbody').children('.trn-table__row').children('.trn-lb-entry__player').children('.trn-lb-entry__name').each(function (i, e)  {
        nameTable.push($(this).text());
      });

      for(let i = 0; i < 10; i++){
        top10Arr.push(nameTable[i]);
      }

      const today = new Date().toLocaleString();


      const rank =  new RankByCountry({
        _id: new mongoose.Types.ObjectId(),
        country: country,
        rank: top10Arr,
        query_date: today
      });


      console.log(top10Arr);
      rank
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: `Selected top 10 players by country ${country}`,
          rank: result
        });
      })
      .catch( err => {
        console.log(err);

        res.status(500).json({
          message: `Top 10 players failed to search by country ${country}`,
          error: err
        });
      });
    }
  });
});



/**
 *
 *  DELETE REQUEST
 *
 */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  RankByCountry.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;