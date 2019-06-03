const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const Product = require('../models/items');


/**
 *
 *    GET REQUEST
 *
 */
router.get('/', (req, res, next) => {
  Product.find()
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

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'No valid data'
        })
      }


    })
    .catch(err => {
      console.log(err);

      res.status(500).json({error: err});
    });
});



/**
 *
 *  POST REQUEST
 *
 */
router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'POST req for /products',
        createdProduct: result
      });
    })
    .catch( err => {
      console.log(err);

      res.status(500).json({
        message: 'POST req for /products',
        error: err
      });
    } );


});


/**
 *
 *  DELETE REQUEST
 *
 */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Product.remove({_id: id})
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