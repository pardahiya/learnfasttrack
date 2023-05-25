const express = require("express");
const Datastore = require("nedb");
const { categories } = require("../data/db");
const router = express.Router();

// Get all categories
router.get("/categories", (req, res) => {
   categories.find({}, (err, docs) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.send(docs);
      }
   });
});

// Get a category by ID
router.get("/categories/:id", (req, res) => {
   categories.findOne({ _id: req.params.id }, (err, category) => {
      if (err) {
         res.status(500).send(err);
      } else if (!category) {
         res.status(404).send({ message: "Category not found" });
      } else {
         res.send(category);
      }
   });
});

// Create a new category
router.post("/categories", (req, res) => {
   const newcategory = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
   };

   categories.insert(newcategory, (err, newDoc) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(201).send(newDoc);
      }
   });
});

// Update a category by ID
router.put("/categories/:id", (req, res) => {
   const updatedcategory = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
   };

   categories.update(
      { _id: req.params.id },
      { $set: updatedcategory },
      {},
      (err, numAffected) => {
         if (err) {
            res.status(500).send(err);
         } else if (numAffected === 0) {
            res.status(404).send({ message: "category not found" });
         } else {
            res.send({ message: "category updated successfully" });
         }
      }
   );
});

// Delete a category by ID
router.delete("/categories/:id", (req, res) => {
   categories.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
      if (err) {
         res.status(500).send(err);
      } else if (numRemoved === 0) {
         res.status(404).send({ message: "category not found" });
      } else {
         res.send({ message: "category deleted successfully" });
      }
   });
});

module.exports = router;
