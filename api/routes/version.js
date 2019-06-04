const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();


const Version = require('../models/version');


/**
 *
 *    GET REQUEST
 *
 */
router.get('/', (req, res, next) => {
  Version.find()
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



/**
 *
 *  POST REQUEST
 *
 */
router.post('/',  (req, res, next) => {
  request('https://www.epicgames.com/fortnite/en-US/patch-notes/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        
        var ver = $('.patch-notes-navigation').find('h1').html();
        ver = ver.split(" ")[0];
        console.log(ver);

        const today = new Date().toLocaleString();

        const version =  new Version({
          _id: new mongoose.Types.ObjectId(),
          version: ver,
          query_date: today
        });

        version
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: 'Current version',
            version: ver
          });
        })
        .catch( err => {
          console.log(err);

          res.status(500).json({
            message: 'Failed to retrieve current version',
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
  Version.remove({_id: id})
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