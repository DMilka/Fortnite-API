const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const axios = require('axios');

const Player = require('../models/socials');


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
    url: `https://api.twitch.tv/kraken/users?login=${username}`,
    headers: {'Accept': 'application/vnd.twitchtv.v5+json','Client-ID': "elwd2hatx1hk79vpeiyb6krk2kojbv"}
  })
  .then(docs => {
    if(docs.data.users.length != 0) {
        var address = `https://api.twitch.tv/kraken/users?login=${username}`;
        

        const today = new Date().toLocaleString();
        const player =  new Player({
                _id: new mongoose.Types.ObjectId(),
                nickname: docs.data.users[0].name,
                link: address,
                query_date: today

        });
        player
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: `Twitch profile link of ${username}`,
            stats: player
          });
        })
        .catch( err => {
          console.log(err);
          res.status(500).json({
            message: `Failed to search for twitch of ${username}`,
            error: err
          });
        });
       } else {
        console.log(`No twitch account detected for ${username}`);
        res.status(500).json({
          message: `${username} doesn't have twitch account`,
          nickname: username,
          link: null
        });
       }

      })
      .catch(e => {
        res.status(500).json({
          message: `${username} doesn't have twitch account`,
          error: err
        });
        console.log(e);
      });
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