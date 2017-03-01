const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');

const PORT = process.env.PORT || 8080

// Retrieve
const MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/askslash", function(err, db) {
  if (err) {
    return console.error('Unable to connect to the server', err);
  }

  // db.createCollection('questions', function(err, collection) {
  //   if(err) { return console.dir(err) }
  //   console.log('Created questions collection');
  // });

  db.close();
});

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('./webpack.config');
  const compiler = webpack(config);
  
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/images/', express.static(path.join(__dirname, '/src/assets/static/img/')));

app.use('/', router);

app.listen(PORT, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
