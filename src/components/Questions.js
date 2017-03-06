const React = require('react');

const Question = require('./Question');

module.exports = React.createClass({
  propTypes: {
    questions: React.PropTypes.array.isRequired,
  },

  getInitialState() {
    return {
      questions: [],
    };
  },

  renderNoQuestions() {
    return(
      <section>
        <div className="text--center">
          There are currently no questions for this meeting.
        </div>
      </section>
    );
  },

  renderQuestions() {
     return(
      <section>
        <ol>
          { this.props.questions.map((question) => {
            return (
              <Question
                question={ question.question }
                date={ question.date }
                channel={ question.channel }
                author= { question.author }
                key= { question._id } />
            );
          })}
        </ol>
      </section>
    );
  },

  render() {
    if (this.props.questions.length) {
      return this.renderQuestions();
    }
    return this.renderNoQuestions();
  }
});