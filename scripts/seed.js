const {
   topicsDb,
   subtopicsDb,
   articlesDb,
   tutorialsDb,
} = require("../data/db");

const topicsData = [
   {
      topicName: "Topic1",
      subtopics: ["sub11", "sub12"],
   },
   {
      topicName: "Topic2",
      subtopics: ["sub21", "sub22"],
   },
];

const articlesData = [
   {
      subtopicName: "sub11",
      title: "Article 1.1.1",
      content: "Sample content for Article 1.1.1",
      level: "basic",
      tags: ["tag1", "tag2"],
      approxCompletionTime: 300,
   },
   {
      subtopicName: "sub12",
      title: "Article 1.2.1",
      content: "Sample content for Article 1.2.1",
      level: "intermediate",
      tags: ["tag1", "tag2"],
      approxCompletionTime: 300,
   },
];

const tutorialsData = [
   {
      subtopicName: "sub12",
      title: "Tutorial 1.1.1",
      description: "A tutorial for Subtopic 1.1",
      level: "basic",
      tags: ["tag1", "tag2"],
      articles: [],
   },
   {
      subtopicName: "sub21",
      title: "Tutorial 1.2.1",
      description: "A tutorial for Subtopic 1.2",
      level: "intermediate",
      tags: ["tag1", "tag2"],
      articles: [],
   },
];

async function seedDatabase() {
   // Insert topics and subtopics
   const subtopicIdsByName = new Map();
   for (const { topicName, subtopics } of topicsData) {
      const topic = { name: topicName };
      const { _id: topicId } = await topicsDb.insert(topic);

      for (const name of subtopics) {
         const subtopic = { topic: topicId, name };
         const { _id: subtopicId } = await subtopicsDb.insert(subtopic);
         subtopicIdsByName.set(name, subtopicId);
      }
   }

   // Insert articles
   for (const {
      subtopicName,
      title,
      content,
      level,
      tags,
      approxCompletionTime,
   } of articlesData) {
      const subtopicId = subtopicIdsByName.get(subtopicName);
      const article = {
         subtopic: subtopicId,
         title,
         content,
         level,
         tags,
         approxCompletionTime,
      };
      await articlesDb.insert(article);
   }

   // Insert tutorials
   for (const {
      subtopicName,
      title,
      description,
      level,
      tags,
      articles,
   } of tutorialsData) {
      const subtopicId = subtopicIdsByName.get(subtopicName);
      const tutorial = {
         subtopic: subtopicId,
         title,
         description,
         level,
         tags,
         articles,
      };
      await tutorialsDb.insert(tutorial);
   }
}

seedDatabase()
   .then(() => {
      console.log("Database seeded successfully.");
   })
   .catch((error) => {
      console.error("Error while seeding the database:", error);
   });

seedDatabase();
