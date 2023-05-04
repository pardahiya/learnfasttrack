const {
   topicsDb,
   subtopicsDb,
   articlesDb,
   tutorialsDb,
} = require("../data/db");

const topicsData = [
   {
      topic: "Topic1",
   },
   {
      topic: "Topic2",
   },
];

const subtopicsData = [
   {
      subtopic: "sub11",
      topic: ["Topic1"],
   },
   {
      subtopic: "sub12",
      topic: ["Topic1"],
   },
   {
      subtopic: "sub21",
      topic: ["Topic2"],
   },
   {
      subtopic: "sub22",
      topic: ["Topic2"],
   },
];

const articlesData = [
   {
      subtopic: "sub11",
      title: "Article 1.1.1",
      content: "Sample content for Article 1.1.1",
      level: "basic",
      tags: ["tag1", "tag2"],
      approxCompletionTime: 300,
   },
   {
      subtopic: "sub12",
      title: "Article 1.2.1",
      content: "Sample content for Article 1.2.1",
      level: "intermediate",
      tags: ["tag1", "tag2"],
      approxCompletionTime: 300,
   },
];

const tutorialsData = [
   {
      subtopic: "sub12",
      title: "Tutorial 1.1.1",
      description: "A tutorial for Subtopic 1.1",
      level: "basic",
      tags: ["tag1", "tag2"],
      articles: [],
   },
   {
      subtopic: "sub21",
      title: "Tutorial 1.2.1",
      description: "A tutorial for Subtopic 1.2",
      level: "intermediate",
      tags: ["tag1", "tag2"],
      articles: [],
   },
];

async function seedDatabase() {
   try {
      await topicsDb.deleteMany();
      await subtopicsDb.deleteMany();
      await articlesDb.deleteMany();
      await tutorialsDb.deleteMany();

      const topicIdMap = {};

      for (const topicData of topicsData) {
         const topic = await topicsDb.insert({ name: topicData.topic });
         const subtopic = await subtopicsDb.insert({
            name: subtopicData.subtopic,
            topic: topicIdMap[subtopicData.topic],
         });
         const article = await articlesDb.insert({
            ...articleData,
            subtopic: subtopicIdMap[articleData.subtopic],
         });
         await tutorialsDb.insert({
            ...tutorialData,
            subtopic: subtopicIdMap[tutorialData.subtopic],
            articles: tutorialArticles,
         });
      }

      console.log("Database seeded successfully!");
   } catch (error) {
      console.error("Error while seeding the database:", error);
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
