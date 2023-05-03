const express = require('express');
const Datastore = require('nedb');
// const path = require('path');
// const topics = new Datastore({ filename: path.join(__dirname, '..', 'data/data', 'topics.db'), autoload: true });
const { topics } = require('../data/db');
const router = express.Router();

// Get all topics
router.get('/topics', (req, res) => {
  topics.find({}, (err, docs) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(docs);
    }
  });
});

// Get a topic by ID
router.get('/topics/:id', (req, res) => {
  topics.findOne({ _id: req.params.id }, (err, topic) => {
    if (err) {
      res.status(500).send(err);
    } else if (!topic) {
      res.status(404).send({ message: 'Topic not found' });
    } else {
      res.send(topic);
    }
  });
});

// Create a new topic
router.post('/topics', (req, res) => {
  const newTopic = {
    name: req.body.name,
    description: req.body.description,
    subtopics: [],
  };

  topics.insert(newTopic, (err, newDoc) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(newDoc);
    }
  });
});

// Update a topic by ID
router.put('/topics/:id', (req, res) => {
  const updatedTopic = {
    name: req.body.name,
    description: req.body.description,
  };

  topics.update({ _id: req.params.id }, { $set: updatedTopic }, {}, (err, numAffected) => {
    if (err) {
      res.status(500).send(err);
    } else if (numAffected === 0) {
      res.status(404).send({ message: 'Topic not found' });
    } else {
      res.send({ message: 'Topic updated successfully' });
    }
  });
});

// Delete a topic by ID
router.delete('/topics/:id', (req, res) => {
  topics.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) {
      res.status(500).send(err);
    } else if (numRemoved === 0) {
      res.status(404).send({ message: 'Topic not found' });
    } else {
      res.send({ message: 'Topic deleted successfully' });
    }
  });
});

// Create a new subtopic for a topic by ID
router.post('/topics/:id/subtopics', (req, res) => {
  const newSubtopic = {
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
  };

  topics.update({ _id: req.params.id }, { $push: { subtopics: newSubtopic } }, {}, (err, numAffected) => {
    if (err) {
      res.status(500).send(err);
    } else if (numAffected === 0) {
      res.status(404).send({ message: 'Topic not found' });
    } else {
      res.status(201).send(newSubtopic);
    }
  });
});

// Get all subtopics for a topic by ID
router.get('/topics/:id/subtopics', (req, res) => {
    topics.findOne({ _id: req.params.id }, (err, topic) => {
      if (err) {
        res.status(500).send(err);
      } else if (!topic) {
        res.status(404).send({ message: 'Topic not found' });
      } else {
        res.send(topic.subtopics);
      }
    });
  });
  
  // Update a subtopic by topic ID and subtopic ID
  router.put('/topics/:topicId/subtopics/:subtopicId', (req, res) => {
    const updatedSubtopic = {
      name: req.body.name,
      description: req.body.description,
    };
  
    topics.update({ _id: req.params.topicId, 'subtopics._id': req.params.subtopicId }, { $set: { 'subtopics.$': updatedSubtopic } }, {}, (err, numAffected) => {
      if (err) {
        res.status(500).send(err);
      } else if (numAffected === 0) {
        res.status(404).send({ message: 'Topic or subtopic not found' });
      } else {
        res.send({ message: 'Subtopic updated successfully' });
      }
    });
  });
  
  // Delete a subtopic by topic ID and subtopic ID
  router.delete('/topics/:topicId/subtopics/:subtopicId', (req, res) => {
    topics.update({ _id: req.params.topicId }, { $pull: { subtopics: { _id: req.params.subtopicId } } }, {}, (err, numAffected) => {
      if (err) {
        res.status(500).send(err);
      } else if (numAffected === 0) {
        res.status(404).send({ message: 'Topic or subtopic not found' });
      } else {
        res.send({ message: 'Subtopic deleted successfully' });
      }
    });
  });
  
  module.exports = router;
  
