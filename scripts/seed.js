const db = require("../data/db");

const topicsData = require("./topics.json");
const subtopicsData = require("./subtopics.json");
const articlesData = require("./articles.json");
const tutorialsData = require("./tutorials.json");

async function seedDatabase() {
   // Clean up the database
   await db.topics.remove({}, { multi: true });
   await db.subtopics.remove({}, { multi: true });
   await db.articles.remove({}, { multi: true });
   await db.tutorials.remove({}, { multi: true });

   // Insert topics
   for (const topic of topicsData) {
      await db.topics.insert(topic);
   }

   // Insert subtopics
   for (const subtopic of subtopicsData) {
      await db.subtopics.insert(subtopic);
   }

   // Insert articles
   for (const article of articlesData) {
      await db.articles.insert(article);
   }

   // Insert tutorials
   for (const tutorial of tutorialsData) {
      await db.tutorials.insert(tutorial);
   }

   console.log("Database seeding completed successfully!");
}

seedDatabase().catch((err) => {
   console.error(`Error while seeding the database: ${err}`);
});
