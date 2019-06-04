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
router.get('/:type', (req, res, next) => {
  const type = req.params.type;
  Rank.find({type: type})
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
router.post('/all',  (req, res, next) => {
   request('https://fortnitetracker.com/leaderboards/pc/Top1?mode=all', (err, ress, html) => {
    if(!err && ress.statusCode == 200) {
      const $ = cheerio.load(html);
      const nameTable = [];
      const top10Arr = [];
      const today = new Date().toLocaleString();

      $('.trn-table').children('tbody').children('.trn-table__row').children('.trn-lb-entry__player').children('.trn-lb-entry__name').each(function (i, e)  {
        nameTable.push($(this).text());
      });

      for(let i = 0; i < 10; i++){
        top10Arr.push(nameTable[i]);
      }

      const rank =  new Rank({
        _id: new mongoose.Types.ObjectId(),
        type: 'all',
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
              type: 'all',
              rank: top10Arr,
              query_date: today
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

router.post('/solo',  (req, res, next) => {
  request('https://fortnitetracker.com/leaderboards/pc/Top1?mode=p2', (err, ress, html) => {
   if(!err && ress.statusCode == 200) {
     const $ = cheerio.load(html);
     const nameTable = [];
     const top10Arr = [];
     const today = new Date().toLocaleString();

     $('.trn-table').children('tbody').children('.trn-table__row').children('.trn-lb-entry__player').children('.trn-lb-entry__name').each(function (i, e)  {
       nameTable.push($(this).text());
     });

     for(let i = 0; i < 10; i++){
       top10Arr.push(nameTable[i]);
     }

     const rank =  new Rank({
       _id: new mongoose.Types.ObjectId(),
       type: 'solo',
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
            type: 'solo',
            rank: top10Arr,
            query_date: today
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
router.post('/squad',  (req, res, next) => {
  request('https://fortnitetracker.com/leaderboards/pc/Top1?mode=p9', (err, ress, html) => {
   if(!err && ress.statusCode == 200) {
     const $ = cheerio.load(html);
     const nameTable = [];
     const top10Arr = [];
     const today = new Date().toLocaleString();

     $('.trn-table').children('tbody').children('.trn-table__row').children('.trn-lb-entry__player').children('.trn-lb-entry__name').each(function (i, e)  {
       nameTable.push($(this).text());
     });

     for(let i = 0; i < 10; i++){
       top10Arr.push(nameTable[i]);
     }

     const rank =  new Rank({
       _id: new mongoose.Types.ObjectId(),
       type: 'squad',
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
            type: 'squad',
              rank: top10Arr,
              query_date: today
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
router.post('/duo',  (req, res, next) => {
  request('https://fortnitetracker.com/leaderboards/pc/Top1?mode=p10', (err, ress, html) => {
   if(!err && ress.statusCode == 200) {
     const $ = cheerio.load(html);
     const nameTable = [];
     const top10Arr = [];
     const today = new Date().toLocaleString();

     $('.trn-table').children('tbody').children('.trn-table__row').children('.trn-lb-entry__player').children('.trn-lb-entry__name').each(function (i, e)  {
       nameTable.push($(this).text());
     });

     for(let i = 0; i < 10; i++){
       top10Arr.push(nameTable[i]);
     }

     const rank =  new Rank({
       _id: new mongoose.Types.ObjectId(),
       type: 'duo',
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
            type: 'duo',
            rank: top10Arr,
            query_date: today
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