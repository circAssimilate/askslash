const _ = require('lodash');
const React = require('react');

const modules = require('../modules');

const Question = require('./Question');

module.exports = React.createClass({
  propTypes: {
    questions: React.PropTypes.array.isRequired,
    showArchived: React.PropTypes.bool.isRequired,
    refreshAppData: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      questions: [],
    };
  },

  archiveQuestion(questionId) {
    const path = `${questionId}/archive`;
    modules.actions.updateQuestion(path)
      .done(response => {
        this.props.refreshAppData();
      });
  },

  renderNoQuestions() {
    return(
      <section className="soft-double">
        <div className="text--center">
          There are currently no questions for this meeting.
        </div>
      </section>
    );
  },

  renderQuestions() {
    const showArchived = this.props.showArchived;
    return(
      <section className="anchor--middle soft-double--sides soft--ends">
        <ol>
          { this.props.questions.map((question) => {
            if (!question.archived || showArchived) {
              return (
                <Question
                  question={ question }
                  archiveQuestion={ this.archiveQuestion }
                  key= { question._id } />
              );
            }
          })}
        </ol>
      </section>
    );
  },

  render() {
    if (this.props.questions.length && _.find(this.props.questions, ['archived', false])) {
      return this.renderQuestions();
    }
    return this.renderNoQuestions();
  }
});