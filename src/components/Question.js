const React = require('react');
const modules = require('../modules');

module.exports = React.createClass({
  propTypes: {
    question: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
  },

  render() {
    return(
      <li className="push--ends question"
          data-question-index={this.props.index} >
        <div dangerouslySetInnerHTML={{__html: this.props.question }}></div>
        <div className="question-info">
          By <span className="highlight">{ this.props.author }</span> { modules.fns.renderTimeSincePosted(this.props.date) }
        </div>
      </li>
    );
  }
});
