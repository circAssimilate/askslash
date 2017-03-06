const bodyParser = require('body-parser');
const express = require('express');
const modules = require('./src/modules');
const mongodb = require('mongodb');
const path = require('path');
const router = express.Router();

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.use('/images/', express.static(path.join(__dirname, '/src/assets/static/img/')));

// main
router.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

// debug
router.get('/users/:userId/books/:bookId', function (request, response) {
  response.send(request.params)
});

const MongoClient = mongodb.MongoClient;

/* QUESTIONS */

// get questions
router.get('/api/v1/questions', function(request, response) {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.QUESTIONS);
    collection.find({}).toArray(function(err, result) {
      if (err) {
        return console.error('Unable to get collection', err);
      }
      console.log('Returned results for', modules.enums.collections.QUESTIONS);
      response.send({
        'questions': result,
      });
    });
    db.close();
  });
});

// create question
router.post('/api/v1/questions', function(request, response) {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.QUESTIONS);

    const question = {
      author: request.body.author,
      channel: request.body.channel,
      date: request.body.date,
      meeting: request.body.meeting,
      question: request.body.question,
    };

    collection.insert(question, function(err, result) {
      if (err) {
        console.error('Unable to post to collection', err);
        return response.send(err);
      }
      console.log('Returned results for', modules.enums.collections.QUESTIONS);
      response.send(result.ops[0]);
    });

    db.close();
  });
});


/* MEETINGS */

// get meeting
router.get('/api/v1/meetings', function(request, response) {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.MEETINGS);
    collection.find({}).toArray(function(err, result) {
      if (err) {
        return console.error('Unable to get collection', err);
      }
      console.log('Returned results for', modules.enums.collections.MEETINGS);
      response.send({
        'meetings': result,
      });
    });
    db.close();
  });
});

// create meeting
router.post('/api/v1/meetings', function(request, response) {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.QUESTIONS);

    const meeting = {
      creator: request.body.creator,
      name: request.body.name,
      date: request.body.date,
      description: request.body.description,
      short_id: request.body.short_id,
    };

    collection.insert(question, function(err, result) {
      if (err) {
        console.error('Unable to post to collection', err);
        return response.send(err);
      }
      console.log('Returned results for', modules.enums.collections.MEETINGS);
      response.send(result.ops[0]);
    });

    db.close();
  });
});

module.exports = router;