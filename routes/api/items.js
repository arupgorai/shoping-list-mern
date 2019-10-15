const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Items');

// Get req for item
router.get('/', (req, res) => {
  Item.find()
    .sort({
      date: -1
    })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

// POST req for item
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem
    .save()
    .then(items => res.json(items))
    .catch(err => console.log('Err saving items', err));
});

// DELETE req for item
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
