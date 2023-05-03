const { tutorials } = require('../data/db');

const htmlTutorials = [
  {
    title: 'HTML - Basic',
    content: 'some test content',
    level: 'basic',
    tags: [ 'HTML' ],
  },
  {
    title: 'HTML - Intermediate',
    content: 'some test content',
    level: 'intermediate',
    tags: [ 'HTML' ],
  },
  {
    title: 'HTML - Advanced',
    content: 'some test content',
    level: 'advanced',
    tags: [ 'HTML' ],
  }
];

tutorials.remove({}, { multi: true }, (err, numRemoved) => {
  if (err) {
    console.log('Error removing existing tutorials:', err);
  } else {
    console.log(`Removed ${numRemoved} existing tutorials`);
    tutorials.insert(htmlTutorials, (err, docs) => {
      if (err) {
        console.log('Error inserting new tutorials:', err);
      } else {
        console.log(`Inserted ${docs.length} new tutorials`);
      }
    });
  }
});