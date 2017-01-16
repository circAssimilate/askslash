require('../assets/stylesheets/base.scss');
var React = require('react');

var App = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },

  render: function () {
    return(
      <p>Hello, {this.props.name}!</p>
    )
  }
});

module.exports = App;
