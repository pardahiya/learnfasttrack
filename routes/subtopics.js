const express = require("express");
const Datastore = require("nedb");
const { subtopics } = require("../data/db");
const router = express.Router();

// Get all subtopics
router.get("/subtopics", (req, res) => {
   subtopics.find({}, (err, docs) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.send(docs);
      }
   });
});

// Get a subtopic by ID
router.get("/subtopics/:id", (req, res) => {
   subtopics.findOne({ _id: req.params.id }, (err, subtopic) => {
      if (err) {
         res.status(500).send(err);
      } else if (!subtopic) {
         res.status(404).send({ message: "subTopic not found" });
      } else {
         res.send(subtopic);
      }
   });
});

// Create a new subtopic
router.post("/subtopics", (req, res) => {
   const newsubTopic = {
      name: req.body.name,
      description: req.body.description,
      subsubtopics: [],
   };

   subtopics.insert(newsubTopic, (err, newDoc) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(201).send(newDoc);
      }
   });
});

// Update a subtopic by ID
router.put("/subtopics/:id", (req, res) => {
   const updatedsubTopic = {
      name: req.body.name,
      description: req.body.description,
   };

   subtopics.update(
      { _id: req.params.id },
      { $set: updatedsubTopic },
      {},
      (err, numAffected) => {
         if (err) {
            res.status(500).send(err);
         } else if (numAffected === 0) {
            res.status(404).send({ message: "subTopic not found" });
         } else {
            res.send({ message: "subTopic updated successfully" });
         }
      }
   );
});

// Delete a subtopic by ID
router.delete("/subtopics/:id", (req, res) => {
   subtopics.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
      if (err) {
         res.status(500).send(err);
      } else if (numRemoved === 0) {
         res.status(404).send({ message: "subTopic not found" });
      } else {
         res.send({ message: "subTopic deleted successfully" });
      }
   });
});

module.exports = router;
