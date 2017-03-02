const React = require('react');

const PresentationModeQuestion = require('./PresentationModeQuestion');

module.exports = React.createClass({
  propTypes: {
    questions: React.PropTypes.array.isRequired,
    togglePresentationMode: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      isLoading: false,
      currentQuestion: 0,
    };
  },

  renderLoading() {
    return (
      <div className="lego-overlay">
        <div className="lego-spinner lego-spinner--small"></div>
      </div>
    );
  },

  render() {
    if (this.state.isLoading) {
      return this.renderLoading();
    }

    const currentQuestion = this.props.questions[this.state.currentQuestion];
    return(
      <div data-ui-hook="presentation-mode" className="flex flex--column">
        <div className="exit noselect" onClick={ this.props.togglePresentationMode }>X</div>
        <PresentationModeQuestion
          currentQuestionIndex={ this.state.currentQuestion }
          questionCount={ this.props.questions.length }
          question={ currentQuestion.question}
          date={ currentQuestion.date }
          author= { currentQuestion.author }
          key= { currentQuestion._id } />
      </div>
    );
  }
});