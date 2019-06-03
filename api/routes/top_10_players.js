const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();


const Rank = require('../models/top_10_players');


/**
 *
 *    GET REQUEST
 *
 */
router.get('/:username', (req, res, next) => {
  Rank.find()
    .exec()
    .then( docs => {
      console.log(docs);
      // if(docs.length >= 0) {
        res.status(200).json(docs);
      // } else {
      //   res.status(404).json({
      //     message: 'No data found!'
      //   })
      // }

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
//   Rank.findById(id)
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
router.post('/',  (req, res, next) => {
   request('https://fortnitetracker.com/leaderboards', (err, ress, html) => {
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

      const rank =  new Rank({
        _id: new mongoose.Types.ObjectId(),
        rank: top10Arr,
        query_date: today
      });



      console.log(top10Arr);
      rank
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: 'Selected top 10 players',
          rank: result
        });
      })
      .catch( err => {
        console.log(err);

        res.status(500).json({
          message: 'Top 10 players failed to search',
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
  Rank.remove({_id: id})
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