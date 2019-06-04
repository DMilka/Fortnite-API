const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const router = express.Router();


const Item = require('../models/item_detail');

/**
 *
 *    GET REQUEST
 *
 */
router.get('/', (req, res, next) => {
  Item.find()
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

//   Product.findById(id)
//     .exec()
//     .then(doc => {
//       console.log(doc);
//       if(doc) {
//         res.status(200).json(doc);
//       } else {
//         res.status(404).json({
//           message: 'No valid data'
//         })
//       }


//     })
//     .catch(err => {
//       console.log(err);

//       res.status(500).json({error: err});
//     });
// });



/**
 *
 *  POST REQUEST
 *
 */
router.post('/:item', (req, res, next) => {

  var itemName = req.params.item;
  axios({
    method: 'get',
    url: `https://fortnite-api.theapinetwork.com/items/list`,
    headers: {'Authorization': "84bf0cc2b4b6be0918da79eff3a8e93b"}
  })
  .then(docs => {

    docs.data.data.forEach(el => {
      if(el.item.name == itemName) {
        console.log(el);
        const today = new Date().toLocaleString();

        let item = new Item({
          _id: new mongoose.Types.ObjectId(),
          itemid: el.itemId,
          name: el.item.name,
          price: el.item.cost,
          type: el.item.type,
          img: el.item.images.icon,
          query_date: today
        });

        item
        .save()
        .then(ress => {
          console.log(res);
          res.status(201).json({
            message: 'Item found',
            item: item,
          });
        })
        .catch( err => {
          console.log(err);

          res.status(500).json({
            message: 'Server problem',
            error: err
          });
        } );
      }
    })
  })
  .catch(ee => {
    res.status(404).json({
      message: 'Item not found',
    });
    console.log(ee);
  })
});


/**
 *
 *  DELETE REQUEST
 *
 */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Item.remove({_id: id})
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