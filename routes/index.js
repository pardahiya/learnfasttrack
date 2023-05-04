const express = require("express");
const { topics, subtopics } = require("../data/db");
const router = express.Router();

router.get("/", async (req, res) => {
   try {
      const alltopics = await topics.find({});
      const allsubtopics = await subtopics.find({});

      // Pass the data to the index.ejs view
      res.render("index", { topics: alltopics, subtopics: allsubtopics });
   } catch (error) {
      console.error("Error fetching topics and subtopics:", error);
      res.status(500).send("Error fetching topics and subtopics");
   }
});

module.exports = router;
