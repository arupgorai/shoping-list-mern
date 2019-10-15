const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Items');

router.get('/', (req, res) => {
  Item.find()
    .sort({
      date: -1
    })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem
    .save()
    .then(items => res.json(items))
    .catch(err => console.log('Err saving items', err));
});

module.exports = router;
