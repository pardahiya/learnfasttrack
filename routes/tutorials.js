const express = require("express");
const Datastore = require("nedb");
const { tutorials } = require("../data/db");
const router = express.Router();

// Get all tutorials
router.get("/tutorials", (req, res) => {
   tutorials.find({}, (err, docs) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.send(docs);
      }
   });
});

// Get a Tutorial by ID
router.get("/tutorials/:id", (req, res) => {
   tutorials.findOne({ _id: req.params.id }, (err, Tutorial) => {
      if (err) {
         res.status(500).send(err);
      } else if (!Tutorial) {
         res.status(404).send({ message: "Tutorial not found" });
      } else {
         res.send(Tutorial);
      }
   });
});

// Create a new Tutorial
router.post("/tutorials", (req, res) => {
   const newTutorial = {
      subtopic: req.body.subtopic,
      title: req.body.title,
      description: req.body.description,
      level: req.body.level, // "basic", "intermediate", or "advanced"
      tags: req.body.tags, // array of tags
      articles: req.body.articles, // array of article ids
   };

   tutorials.insert(newTutorial, (err, newDoc) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(201).send(newDoc);
      }
   });
});

// Update a Tutorial by ID
router.put("/tutorials/:id", (req, res) => {
   const updatedTutorial = {
      subtopic: req.body.subtopic,
      title: req.body.title,
      content: req.body.content,
      level: req.body.level, // "basic", "intermediate", or "advanced"
      tags: req.body.tags, // array of tags
      articles: req.body.articles, // array of article ids
   };

   tutorials.update(
      { _id: req.params.id },
      { $set: updatedTutorial },
      {},
      (err, numAffected) => {
         if (err) {
            res.status(500).send(err);
         } else if (numAffected === 0) {
            res.status(404).send({ message: "Tutorial not found" });
         } else {
            res.send({ message: "Tutorial updated successfully" });
         }
      }
   );
});

// Delete a Tutorial by ID
router.delete("/tutorials/:id", (req, res) => {
   tutorials.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
      if (err) {
         res.status(500).send(err);
      } else if (numRemoved === 0) {
         res.status(404).send({ message: "Tutorial not found" });
      } else {
         res.send({ message: "Tutorial deleted successfully" });
      }
   });
});

module.exports = router;
