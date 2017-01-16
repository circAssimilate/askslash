require('../assets/stylesheets/base.scss');
var React = require('react');

var App = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },

  render: function () {
    return(
      <h1>Hello, {this.props.name}!</h1>
    )
  }
});

module.exports = App;
