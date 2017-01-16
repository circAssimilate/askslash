# Ask Slash

An open source application for moderating questions. Built with React v15 and Babel v6 and deployed on Heroku. Setup instructions adapted from [React + Node Starter (for Heroku)](https://github.com/alanbsmith/react-node-example) by [alanbsmith](https://github.com/alanbsmith).

### Get Up & Running
* `npm install`
* `npm start`
* visit `http://localhost:8080/`

### DEPLOYING TO HEROKU
This app is set up for easy deployment to Heroku!

Get a refresher on deploying apps with Heroku, [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction). Heroku will follow the `postinstall` command in your `package.json` and compile assets with `webpack.prod.config.js`. It runs the Express web server in `server.js`. You'll notice there's a special section set up for running in development.
