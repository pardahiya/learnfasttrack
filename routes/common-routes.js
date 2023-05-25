const express = require("express");
const fs = require("fs");
const path = require("path");
const marked = require("marked");
marked.use({
   mangle: false,
   headerIds: false,
});

const {
   categories,
   topics,
   articles,
   tutorials,
   tutorialArticles,
} = require("../data/db");
const router = express.Router();

// Utility function to wrap NeDB find method in a Promise
function findPromise(collection, query, options = {}) {
   return new Promise((resolve, reject) => {
      collection
         .find(query)
         .skip(options.skip || 0)
         .limit(options.limit || 0)
         .exec((err, docs) => {
            if (err) {
               reject(err);
            } else {
               resolve(docs);
            }
         });
   });
}

// Utility function to wrap NeDB findOne method in a Promise
function findOnePromise(collection, query) {
   return new Promise((resolve, reject) => {
      collection.findOne(query).exec((err, doc) => {
         if (err) {
            reject(err);
         } else {
            resolve(doc);
         }
      });
   });
}

function countPromise(collection, query) {
   return new Promise((resolve, reject) => {
      collection.count(query, (err, count) => {
         if (err) {
            reject(err);
         } else {
            resolve(count);
         }
      });
   });
}

router.get("/", async (req, res) => {
   try {
      const allcategories = await findPromise(categories, {});
      const alltopics = await findPromise(topics, {});
      const allarticles = await findPromise(articles, {}, { limit: 10 });
      const alltutorials = await findPromise(tutorials, {}, { limit: 10 });

      // Iterate over each category and add related topics to the category
      allcategories.forEach((category) => {
         category.topics = alltopics.filter(
            (topic) => topic.category === category.name
         );
      });

      res.render("index", {
         categories: allcategories,
         topics: alltopics,
         articles: allarticles,
         tutorials: alltutorials,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send("Error while fetching data.");
   }
});

router.get("/topics", async (req, res) => {
   try {
      const allcategories = await findPromise(categories, {});
      const alltopics = await findPromise(topics, {});
      // Iterate over each category and add related topics to the category
      allcategories.forEach((category) => {
         category.topics = alltopics.filter(
            (topic) => topic.category === category.name
         );
      });

      // const limit = parseInt(req.query.limit) || 15;
      const limit = 15;
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;
      const topicsCurrentPage = await findPromise(
         topics,
         {},
         { limit: limit, skip: skip }
      );

      res.render("topics", {
         categories: allcategories,
         topics: topicsCurrentPage,
         currentPage: page,
         totalPages: Math.ceil(alltopics.length / limit),
      });
   } catch (err) {
      console.log(err);
      res.status(500).send("Error while fetching data.");
   }
});

router.get("/tutorials", async (req, res) => {
   try {
      const allcategories = await findPromise(categories, {});
      const alltopics = await findPromise(topics, {});
      // Iterate over each category and add related topics to the category
      allcategories.forEach((category) => {
         category.topics = alltopics.filter(
            (topic) => topic.category === category.name
         );
      });

      const limit = parseInt(req.query.limit) || 15;
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;
      const alltutorials = await findPromise(
         tutorials,
         {},
         { limit: limit, skip: skip }
      );
      // Get the total number of tutorials that match the query
      const totalTutorialsCount = await countPromise(tutorials, {});

      res.render("tutorials", {
         tutorials: alltutorials,
         categories: allcategories,
         topics: alltopics,
         currentPage: page,
         totalPages: Math.ceil(totalTutorialsCount.length / limit),
         routePath: req.originalUrl,
         query: "",
      });
   } catch (err) {
      console.log(err);
      res.status(500).send("Error while fetching data.");
   }
});

//make sure this route is before /tutorials/:name route or else this wont work
router.get("/tutorials/search", async (req, res) => {
   try {
      const allcategories = await findPromise(categories, {});
      const alltopics = await findPromise(topics, {});
      // Iterate over each category and add related topics to the category
      allcategories.forEach((category) => {
         category.topics = alltopics.filter(
            (topic) => topic.category === category.name
         );
      });

      // Find tutorials with a title that includes the search query
      // We're using RegExp with 'i' option for case-insensitive search
      const query = req.query.q;

      const limit = parseInt(req.query.limit) || 15;
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;
      const matchingTutorials = await findPromise(
         tutorials,
         {
            title: { $regex: new RegExp(query, "i") },
         },
         { limit: limit, skip: skip }
      );
      // Get the total number of tutorials that match the query
      const matchingTutorialsCount = await countPromise(tutorials, {
         title: { $regex: new RegExp(query, "i") },
      });

      // Render a search results page and pass it the matching tutorials
      res.render("searchTutorials", {
         tutorials: matchingTutorials,
         categories: allcategories,
         topics: alltopics,
         currentPage: page,
         totalPages: Math.ceil(matchingTutorialsCount.length / limit),
         routePath: req.originalUrl,
         query: query,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send("Error while fetching data.");
   }
});

router.get("/tutorials/topic/:topic", async (req, res) => {
   try {
      const allcategories = await findPromise(categories, {});
      const alltopics = await findPromise(topics, {});
      // Iterate over each category and add related topics to the category
      allcategories.forEach((category) => {
         category.topics = alltopics.filter(
            (topic) => topic.category === category.name
         );
      });

      const limit = parseInt(req.query.limit) || 15;
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;

      const topicTutorials = await findPromise(
         tutorials,
         {
            topic: req.params.topic,
         },
         { limit: limit, skip: skip }
      );

      const topic = await findOnePromise(topics, { name: req.params.topic });
      // Get the total number of tutorials that match the query
      const totalTutorialsCount = await countPromise(tutorials, {
         topic: topic.name,
      });

      const relatedTopics = await findPromise(
         topics,
         {
            category: topic.name,
         },
         { limit: 10 }
      );

      res.render("topicTutorials", {
         categories: allcategories,
         tutorials: topicTutorials,
         topic: topic,
         relatedTopics: relatedTopics,
         currentPage: page,
         totalPages: Math.ceil(totalTutorialsCount.length / limit),
      });
   } catch (err) {
      console.log(err);
      res.status(500).send("Error while fetching data.");
   }
});

router.get("/tutorials/category/:category", async (req, res) => {
   try {
      const allcategories = await findPromise(categories, {});
      const alltopics = await findPromise(topics, {});
      // Iterate over each category and add related topics to the category
      allcategories.forEach((category) => {
         category.topics = alltopics.filter(
            (topic) => topic.category === category.name
         );
      });

      const specificCategory = await findOnePromise(categories, {
         name: req.params.category,
      });

      const topicsInCategory = await findPromise(topics, {
         category: req.params.category,
      });

      // Here we extract all the topic names in the category into an array
      const topicNames = topicsInCategory.map((topic) => topic.name);

      const limit = parseInt(req.query.limit) || 15;
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;

      // Find all tutorials that have a topic that exists in the array of topic names
      const relatedTutorials = await findPromise(
         tutorials,
         {
            topic: { $in: topicNames },
         },
         { limit: limit, skip: skip }
      );

      // Get the total number of tutorials that match the query
      const totalTutorialsCount = await countPromise(tutorials, {
         topic: { $in: topicNames },
      });

      res.render("categoryTutorials", {
         tutorials: relatedTutorials,
         categories: allcategories,
         category: specificCategory,
         topicsInCategory: topicsInCategory,
         currentPage: page,
         totalPages: Math.ceil(totalTutorialsCount / limit),
      });
   } catch (err) {
      console.log(err);
      res.status(500).send("Error while fetching data.");
   }
});

router.get("/tutorials/:name", async (req, res) => {
   try {
      const allcategories = await findPromise(categories, {});
      const alltopics = await findPromise(topics, {});
      // Iterate over each category and add related topics to the category
      allcategories.forEach((category) => {
         category.topics = alltopics.filter(
            (topic) => topic.category === category.name
         );
      });

      const tutorial = await findOnePromise(tutorials, {
         name: req.params.name,
      });

      if (tutorial) {
         const articlesInTutorial = await findOnePromise(tutorialArticles, {
            tutorial: req.params.name,
         });

         var firstArticleName = "";
         var articleContent = "Article not found";
         if (
            articlesInTutorial &&
            articlesInTutorial.articles &&
            articlesInTutorial.articles.length > 0
         ) {
            firstArticleName = articlesInTutorial.articles[0];
            const firstArticle = await findOnePromise(articles, {
               name: firstArticleName,
            });

            if (firstArticle) {
               // Read the markdown content of the first article
               const markdownContent = fs.readFileSync(
                  path.resolve(`articles${firstArticle.contentPath}`),
                  "utf8"
               );

               // Convert markdown content to HTML
               articleContent = marked.parse(markdownContent);
            }
         }

         const topic = await findOnePromise(topics, { name: tutorial.topic });
         const relatedTutorials = await findPromise(
            tutorials,
            {
               topic: tutorial.topic,
            },
            { limit: 10 }
         );

         // Send the data to the view
         res.render("tutorial", {
            tutorial: tutorial,
            articlesInTutorial: articlesInTutorial,
            currentArticleName: firstArticleName,
            currentArticleContent: articleContent,
            categories: allcategories,
            topic: topic,
            relatedTutorials: relatedTutorials,
         });
      } else {
         res.status(404).send("Tutorial not found.");
      }
   } catch (err) {
      console.log(err);
      res.status(500).send("Error while fetching data.");
   }
});

router.get("/tutorials/:name/:article", async (req, res) => {
   try {
      const allcategories = await findPromise(categories, {});
      const alltopics = await findPromise(topics, {});
      // Iterate over each category and add related topics to the category
      allcategories.forEach((category) => {
         category.topics = alltopics.filter(
            (topic) => topic.category === category.name
         );
      });

      const tutorial = await findOnePromise(tutorials, {
         name: req.params.name,
      });

      if (tutorial) {
         const articlesInTutorial = await findOnePromise(tutorialArticles, {
            tutorial: req.params.name,
         });

         const selectedArticle = await findOnePromise(articles, {
            name: req.params.article,
         });

         var articleContent = "Article not found";
         if (selectedArticle) {
            // Read the markdown content of the first article
            const markdownContent = fs.readFileSync(
               path.resolve(`articles${selectedArticle.contentPath}`),
               "utf8"
            );

            // Convert markdown content to HTML
            articleContent = marked.parse(markdownContent);
         }

         const topic = await findOnePromise(topics, { name: tutorial.topic });
         const relatedTutorials = await findPromise(
            tutorials,
            {
               topic: tutorial.topic,
            },
            { limit: 10 }
         );

         // Send the data to the view
         res.render("tutorial", {
            tutorial: tutorial,
            articlesInTutorial: articlesInTutorial,
            currentArticleContent: articleContent,
            currentArticleName: req.params.article,
            categories: allcategories,
            topic: topic,
            relatedTutorials: relatedTutorials,
         });
      } else {
         res.status(404).send("Tutorial not found.");
      }
   } catch (err) {
      console.log(err);
      res.status(500).send("Error while fetching data.");
   }
});

module.exports = router;
