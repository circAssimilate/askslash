# Ask Slash

An open source application for moderating questions. Built with React v15 and Babel v6 and deployed on Heroku. Setup instructions adapted from [React + Node Starter (for Heroku)](https://github.com/alanbsmith/react-node-example) by [alanbsmith](https://github.com/alanbsmith).

## Get Up & Running
### Install and Run MongoDB
* Open the Terminal app and type `brew update`.
* After updating Homebrew `brew install mongodb`
* After downloading Mongo, create the “db” directory. This is where the Mongo data files will live. You can create the directory in the default location by running `mkdir -p /data/db`
* Make sure that the /data/db directory has the right permissions by running the following:
```
sudo chown -R `id -un` /data/db
```
* Run the Mongo daemon, in one of your terminal windows run `mongod`. This should start the Mongo server.
* Run the Mongo shell, with the Mongo daemon running in one terminal, type `mongo` in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.
* To exit the Mongo shell run quit()
* To stop the Mongo daemon hit ctrl-c

### NPM Install and Run
* `npm install`
* `npm start`
* visit `http://localhost:8080/`

### DEPLOYING TO HEROKU
This app is set up for easy deployment to Heroku!

Get a refresher on deploying apps with Heroku, [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction). Heroku will follow the `postinstall` command in your `package.json` and compile assets with `webpack.prod.config.js`. It runs the Express web server in `server.js`. You'll notice there's a special section set up for running in development.
