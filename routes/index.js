const express = require("express");
const { topics, subtopics, articles, tutorials } = require("../data/db");
const router = express.Router();

// topics.loadDatabase();
// subtopics.loadDatabase();

router.get("/", (req, res) => {
   topics.find({}, (err, alltopics) => {
      if (err) {
         console.log(err);
         res.status(500).send("Error while fetching topics.");
      } else {
         subtopics.find({}, (err, allsubtopics) => {
            if (err) {
               console.log(err);
               res.status(500).send("Error while fetching subtopics.");
            } else {
               articles.find({}, (err, allarticles) => {
                  if (err) {
                     console.log(err);
                     res.status(500).send("Error while fetching subtopics.");
                  } else {
                     tutorials.find({}, (err, alltutorials) => {
                        if (err) {
                           console.log(err);
                           res.status(500).send(
                              "Error while fetching subtopics."
                           );
                        } else {
                           res.render("index", {
                              topics: alltopics,
                              subtopics: allsubtopics,
                              articles: allarticles,
                              tutorials: alltutorials,
                           });
                        }
                     });
                  }
               });
            }
         });
      }
   });
});

module.exports = router;
