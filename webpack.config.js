var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '/dist');
var APP_DIR = path.resolve(__dirname, './src/app');

var config = {
  entry: APP_DIR + '/components/main/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'),
      assets: path.resolve(__dirname, 'src/assets'),
      node_modules: path.resolve(__dirname, 'node_modules'),
    },
  },
  module: {
  loaders: [
      {
        test: /\.js/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader'
      },
    ]
  },
  resolveLoader: {
    alias: {
      'babel': 'babel-loader',
    },
  }
};

module.exports = config;
