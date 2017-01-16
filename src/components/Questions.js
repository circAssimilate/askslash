const React = require('react');

const Question = require('./Question');

module.exports = React.createClass({
  propTypes: {
    questions: React.PropTypes.array.isRequired,
  },

  getInitialState: function() {
    return {
      isLoading: false,
    };
  },

  render: function () {
    let questions = this.props.questions;

    if (this.state.isLoading) {
      return (
        <div>
          <div className="lego-overlay">
            <div className="lego-spinner lego-spinner--small"></div>
          </div>
        </div>
      );
    } else {
      return(
        <ol className="flex--1 soft">
          { questions.map((question, index) => {
            return (
              <Question
                text={ question.text }
                date={ question.date }
                author= { question.author }
                index= { index } />
            );
          })}
        </ol>
      );
    }
  }
});

// setTimeout(function(){
//     this.setState({isLoading: true});
// }.bind(this), 1000);
