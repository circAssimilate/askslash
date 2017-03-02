const React = require('react');

const Question = require('./Question');

module.exports = React.createClass({
  propTypes: {
    questions: React.PropTypes.array.isRequired,
  },

  getInitialState() {
    return {
      isLoading: false,
      questions: [],
    };
  },

  renderLoading() {
    return (<div className="lego-overlay">
      <div className="lego-spinner lego-spinner--small"></div>
    </div>);
  },

  render() {
    if (this.state.isLoading) {
      return this.renderLoading();
    }

    return(
      <section>
        <ol>
          { this.props.questions.map((question) => {
            return (
              <Question
                question={ question.question }
                date={ question.date }
                author= { question.author }
                key= { question._id } />
            );
          })}
        </ol>
      </section>
    );
  }
});