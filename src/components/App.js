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

// Original
// import React, { Component } from 'react';
//
// class App extends Component {
//   render() {
//     return(
//       <h1>Hello, {this.props.name}!</h1>
//     )
//   }
// };
//
// export default App;
