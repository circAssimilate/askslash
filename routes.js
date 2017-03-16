const bodyParser = require('body-parser');
const express = require('express');
const modules = require('./src/modules');
const path = require('path');
const router = express.Router();

const {
  MongoClient,
  ObjectId,
} = require('mongodb');

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.use('/images/', express.static(path.join(__dirname, '/src/assets/static/img/')));

/* MAIN */

router.get('/', (request, response) => {
  response.sendFile(__dirname + '/dist/index.html')
});

/* QUESTIONS */

// get questions
router.get('/api/v1/questions/:meetingId', (request, response) => {
  const meetingId = request.params.meetingId;
  const questionQuery = meetingId ? { meeting_id: meetingId, deleted: false } : { deleted: false };

  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, (err, db) => {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.QUESTIONS);
    collection.find(questionQuery).toArray((err, result) => {
      if (err) {
        return console.error('Unable to get collection', err);
      }
      response.send({
        'questions': result,
      });
    });
    db.close();
  });
});

// create question
router.post('/api/v1/questions', (request, response) => {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, (err, db) => {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.QUESTIONS);

    const question = {
      author: request.body.author,
      channel: request.body.channel,
      date: request.body.date,
      meeting_id: request.body.meeting_id,
      question: request.body.question,
      archived: false,
      deleted: false,
    };

    collection.insert(question, (err, result) => {
      if (err) {
        console.error('Unable to post to collection', err);
        return response.send(err);
      }
      response.send(result.ops[0]);
    });

    db.close();
  });
});

// update question
router.put('/api/v1/questions/:questionId/:instruction', (request, response) => {
  const instruction = request.params.instruction;
  const questionId = request.params.questionId;
  let update = {};

  switch(instruction) {
    case 'archive':
      update = { archived: true };
      break;
    case 'unarchive':
      update = { archived: false };
      break;
    case 'delete':
      update = { deleted: true };
      break;
  }

  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, (err, db) => {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.QUESTIONS);
    collection.update({ _id: ObjectId(questionId) }, { $set: update }, (err, result) => {
      if (err) {
        console.error('Unable to update question', err);
        return response.send(err);
      }
    });

    response.send({status: 'success'});

    db.close();
  });
});

/* MEETINGS */

// get meeting
router.get('/api/v1/meetings', (request, response) => {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, (err, db) => {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.MEETINGS);
    collection.find({}).toArray((err, result) => {
      if (err) {
        return console.error('Unable to get collection', err);
      }
      response.send({
        'meetings': result,
      });
    });
    db.close();
  });
});

// create meeting
router.post('/api/v1/meetings', (request, response) => {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, (err, db) => {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.MEETINGS);

    const meeting = {
      creator: request.body.creator,
      name: request.body.name,
      date: request.body.date,
      short_id: request.body.short_id,
    };

    let counter = 0;
    while(!meeting.short_id && counter < 10000) {
      counter = counter + 1;
      const shortId = modules.fns.shortId();
      const itemLookup = collection.find({short_id: shortId}, {_id: 1}).toArray((err, result) => {
        if(err) {
          return console.log('There was an error searching for the short_id', err);
        }
        return result[0];
      });
      if (!itemLookup) {
        meeting.short_id = shortId;
      }
    }

    collection.insert(meeting, (err, result) => {
      if (err) {
        console.error('Unable to create meeting', err);
        return response.send(err);
      }
      response.send(result.ops[0]);
    });

    db.close();
  });
});

// delete meeting
router.delete('/api/v1/meetings/:meetingId', (request, response) => {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, (err, db) => {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }

    const collection = db.collection(modules.enums.collections.MEETINGS);
    const meetingId = request.params.meetingId;

    collection.deleteOne({ _id: ObjectId(meetingId) }, (err, result) => {
      if (err) {
        console.error('Unable to delete meeting', err);
        return response.send(err);
      }
      response.send({status: 'success'});
    });

    db.close();

  });
});

// archive all questions in meeting
router.put('/api/v1/meetings/:meetingId/:instruction', (request, response) => {
  const meetingId = request.params.meetingId;
  const instruction = request.params.instruction;
  let update = {};

  switch(instruction) {
    case 'archive':
      update = { archived: true };
      break;
  }

  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, (err, db) => {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.QUESTIONS);
    collection.updateMany({ meeting_id: meetingId }, { $set: update }, (err, result) => {
      if (err) {
        console.error('Unable to archive all questions', err);
        return response.send(err);
      }
    });

    response.send({status: 'success'});

    db.close();
  });
});

module.exports = router;