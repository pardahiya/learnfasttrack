const express = require("express");
const { promisify } = require("util");
const { topics } = require("../data/db");
const router = express.Router();

// Promisify the nedb methods
const findTopics = promisify(topics.find).bind(topics);
const findOneTopic = promisify(topics.findOne).bind(topics);
const insertTopic = promisify(topics.insert).bind(topics);
const updateTopic = promisify(topics.update).bind(topics);
const removeTopic = promisify(topics.remove).bind(topics);

// Get all topics
router.get("/topics", (req, res) => {
   findTopics({})
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send(err));
});

// Get a topic by ID
router.get("/topics/:id", (req, res) => {
   findOneTopic({ _id: req.params.id })
      .then((topic) => {
         if (!topic) {
            res.status(404).send({ message: "Topic not found" });
         } else {
            res.send(topic);
         }
      })
      .catch((err) => res.status(500).send(err));
});

// Create a new topic
router.post("/topics", (req, res) => {
   const newTopic = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
   };

   insertTopic(newTopic)
      .then((newDoc) => res.status(201).send(newDoc))
      .catch((err) => res.status(500).send(err));
});

// Update a topic by ID
router.put("/topics/:id", (req, res) => {
   const updatedTopic = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
   };

   updateTopic({ _id: req.params.id }, { $set: updatedTopic }, {})
      .then((numAffected) => {
         if (numAffected === 0) {
            res.status(404).send({ message: "Topic not found" });
         } else {
            res.send({ message: "Topic updated successfully" });
         }
      })
      .catch((err) => res.status(500).send(err));
});

// Delete a topic by ID
router.delete("/topics/:id", (req, res) => {
   removeTopic({ _id: req.params.id }, {})
      .then((numRemoved) => {
         if (numRemoved === 0) {
            res.status(404).send({ message: "Topic not found" });
         } else {
            res.send({ message: "Topic deleted successfully" });
         }
      })
      .catch((err) => res.status(500).send(err));
});

module.exports = router;
