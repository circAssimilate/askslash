var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

var Parent = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Ask Slash</h1>
        <App name='World'/>
      </div>
    );
  }
});

ReactDOM.render(
  <Parent />,
  document.getElementById('root')
);
