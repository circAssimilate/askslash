var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

var Parent = React.createClass({
  render: function () {
    return (
      <div className="soft">
        <h1>Ask Slash</h1>
        <App name='world'/>
      </div>
    );
  }
});

ReactDOM.render(
  <Parent />,
  document.getElementById('root')
);
