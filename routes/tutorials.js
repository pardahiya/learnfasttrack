const express = require('express');
const Datastore = require('nedb');
const { tutorials } = require('../data/db');
const router = express.Router();

// Get all tutorials
router.get('/tutorials', (req, res) => {
    tutorials.find({}, (err, docs) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(docs);
    }
  });
});

// Get a tutorial by ID
router.get('/tutorials/:id', (req, res) => {
  tutorials.findOne({ _id: req.params.id }, (err, tutorial) => {
    if (err) {
      res.status(500).send(err);
    } else if (!tutorial) {
      res.status(404).send({ message: 'tutorial not found' });
    } else {
      res.send(tutorial);
    }
  });
});

// Create a new tutorial
router.post('/tutorials', (req, res) => {
    const newTutorial = {
        subtopic: req.body.subtopic,
        title: req.body.title,
        content: req.body.content,
        level: req.body.level, // "basic", "intermediate", or "advanced"
        tags: req.body.tags, // array of tags
      };

  tutorials.insert(newtutorial, (err, newDoc) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(newDoc);
    }
  });
});

// Update a tutorial by ID
router.put('/tutorials/:id', (req, res) => {
  const updatedtutorial = {
    subtopic: req.body.subtopic,
    title: req.body.title,
    content: req.body.content,
    level: req.body.level, // "basic", "intermediate", or "advanced"
    tags: req.body.tags, // array of tags
  };

  tutorials.update({ _id: req.params.id }, { $set: updatedtutorial }, {}, (err, numAffected) => {
    if (err) {
      res.status(500).send(err);
    } else if (numAffected === 0) {
      res.status(404).send({ message: 'tutorial not found' });
    } else {
      res.send({ message: 'tutorial updated successfully' });
    }
  });
});

// Delete a tutorial by ID
router.delete('/tutorials/:id', (req, res) => {
  tutorials.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) {
      res.status(500).send(err);
    } else if (numRemoved === 0) {
      res.status(404).send({ message: 'tutorial not found' });
    } else {
      res.send({ message: 'tutorial deleted successfully' });
    }
  });
});
  
module.exports = router;
