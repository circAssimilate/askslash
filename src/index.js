var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

var Parent = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Derek's Changes</h1>
        <App name=''/>
      </div>
    );
  }
});

ReactDOM.render(
  <Parent />,
  document.getElementById('root')
);

// Original File
// import React from 'react';
// import { render } from 'react-dom';
// import App from './components/App';
//
// render(<App name='World'/>, document.getElementById('root'));
