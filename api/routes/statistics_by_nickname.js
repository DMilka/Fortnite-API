const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();
const axios = require('axios');
const JSON = require('circular-json');


const Player = require('../models/statistics_by_nickname');


/**
 *
 *    GET REQUEST
 *
 */
router.get('/:nickname', (req, res, next) => {
  const nickname = req.params.nickname;
  Player.find({nickname: nickname})
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


/**
 *
 *  POST REQUEST
 *
 */



router.post('/:username', (req, res, next) => {
  const username = req.params.username;

  axios({
    method: 'get',
    url: `https://fortnite-api.theapinetwork.com/users/id?username=${username}`,
    headers: {'Authorization': "84bf0cc2b4b6be0918da79eff3a8e93b"}
  })
  .then(docss => {

      axios({
        method: 'get',
        url: `https://fortnite-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=${docss.data.data.uid}`,
        headers: {'Authorization': "84bf0cc2b4b6be0918da79eff3a8e93b"}
      })
      .then(docs => {

        let solo, duo, squad;
        for(let i = 0; i < docs.data.data.stats.keyboardmouse.length; i++ ) {
          if(docs.data.data.stats.keyboardmouse[i].id === 'defaultsolo') {
            solo = docs.data.data.stats.keyboardmouse[i].entries[0].stats;
          }
          if(docs.data.data.stats.keyboardmouse[i].id === 'defaultduo') {
            duo = docs.data.data.stats.keyboardmouse[i].entries[0].stats;
          }
          if(docs.data.data.stats.keyboardmouse[i].id === 'defaultsquad') {
            squad = docs.data.data.stats.keyboardmouse[i].entries[0].stats;
          }
        }

        const today = new Date().toLocaleString();
        // const data = res.status(200).json(docs.data);
        const player =  new Player({
                _id: new mongoose.Types.ObjectId(),
                nickname: docs.data.data.username,
                solo: solo,
                duo: duo,
                squad: squad,
                query_date: today

        });
        // res.status(200).json(docs.data);
        // res.status(200).json(player);

        player
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: `Selected stats for player ${docs.data.data.username}`,
            stats: player
          });
        })
        .catch( err => {
          console.log(err);
          res.status(500).json({
            message: `Stats for player ${docs.data.data.username} failed to search`,
            error: err
          });
        });
        //

      })
      .catch(e => {
        res.status(500).json({
          message: `Player doesnt exist`,
          error: err
        });
        console.log(e);
      });


  })
  .catch(ee => {
    res.status(500).json({
      message: `Player doesnt exist`,


    });
    console.log(ee);
  }) ;


});

/**
 *
 *  DELETE REQUEST
 *
 */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Player.remove({_id: id})
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