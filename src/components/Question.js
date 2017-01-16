const React = require('react');

module.exports = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    index: React.PropTypes.string.isRequired,
  },

  render: function () {
    return(
      <li className="push--ends"
          data-question-index={this.props.index} >
        <blockquote style={{ fontSize: 16 }}>
          { this.props.text }
        </blockquote>
        <div className="text--right"
             style={{ fontSize: 12 }}>
          By { this.props.author } on { this.props.date }
        </div>
      </li>
    );
  }
});
