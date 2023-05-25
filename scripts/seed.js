const db = require("../../data/db");

const categoriesData = require("./categories.json");
const topicsData = require("./topics.json");
const articlesData = require("./articles.json");
const tutorialsData = require("./tutorials.json");
const tutorialArticlesData = require("./tutorialArticles.json");

async function seedDatabase() {
   // Clean up the database
   await db.categories.remove({}, { multi: true });
   await db.topics.remove({}, { multi: true });
   await db.articles.remove({}, { multi: true });
   await db.tutorials.remove({}, { multi: true });
   await db.tutorialArticles.remove({}, { multi: true });

   // Insert categories
   for (const category of categoriesData) {
      await db.categories.insert(category);
   }

   // Insert topics
   for (const topic of topicsData) {
      await db.topics.insert(topic);
   }

   // Insert articles
   for (const article of articlesData) {
      await db.articles.insert(article);
   }

   // Insert tutorials
   for (const tutorial of tutorialsData) {
      await db.tutorials.insert(tutorial);
   }

   // Insert tutorials
   for (const tutorialArticlesItem of tutorialArticlesData) {
      await db.tutorialArticles.insert(tutorialArticlesItem);
   }

   console.log("Database seeding completed successfully!");
}

seedDatabase().catch((err) => {
   console.error(`Error while seeding the database: ${err}`);
});
