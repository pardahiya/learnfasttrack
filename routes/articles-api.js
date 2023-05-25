const express = require("express");
const Datastore = require("nedb");
const { articles } = require("../data/db");
const router = express.Router();

// Get all articles
router.get("/articles", (req, res) => {
   articles.find({}, (err, docs) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.send(docs);
      }
   });
});

// Get a Article by ID
router.get("/articles/:id", (req, res) => {
   articles.findOne({ _id: req.params.id }, (err, Article) => {
      if (err) {
         res.status(500).send(err);
      } else if (!Article) {
         res.status(404).send({ message: "Article not found" });
      } else {
         res.send(Article);
      }
   });
});

// Create a new Article
router.post("/articles", (req, res) => {
   const newArticle = {
      subtopic: req.body.subtopic,
      title: req.body.title,
      content: req.body.content,
      level: req.body.level, // "basic", "intermediate", or "advanced"
      tags: req.body.tags, // array of tags
      approxCompletionTime: req.body.approxCompletionTime, // approx completion time in secs
   };

   articles.insert(newArticle, (err, newDoc) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(201).send(newDoc);
      }
   });
});

// Update a Article by ID
router.put("/articles/:id", (req, res) => {
   const updatedArticle = {
      subtopic: req.body.subtopic,
      title: req.body.title,
      content: req.body.content,
      level: req.body.level, // "basic", "intermediate", or "advanced"
      tags: req.body.tags, // array of tags
      approxCompletionTime: req.body.approxCompletionTime, // approx completion time in secs
   };

   articles.update(
      { _id: req.params.id },
      { $set: updatedArticle },
      {},
      (err, numAffected) => {
         if (err) {
            res.status(500).send(err);
         } else if (numAffected === 0) {
            res.status(404).send({ message: "Article not found" });
         } else {
            res.send({ message: "Article updated successfully" });
         }
      }
   );
});

// Delete a Article by ID
router.delete("/articles/:id", (req, res) => {
   articles.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
      if (err) {
         res.status(500).send(err);
      } else if (numRemoved === 0) {
         res.status(404).send({ message: "Article not found" });
      } else {
         res.send({ message: "Article deleted successfully" });
      }
   });
});

module.exports = router;
