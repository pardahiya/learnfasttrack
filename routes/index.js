const express = require('express');
const { topics } = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  topics.find({}, (err, docs) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('index', { topics: docs });
    }
  });
});

module.exports = router;