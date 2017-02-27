const React = require('react');

const {
  ButtonRow,
  Button,
  Textarea
} = require('optimizely-oui');

module.exports = React.createClass({
  getInitialState() {
    return {
      isCollapsed: true,
      question: '',
    };
  },

  toggleQuestionBox() {
    this.setState({isCollapsed: !this.state.isCollapsed});
  },

  renderCollapsed() {
    return(<div className="push-double--top">
        <Button
          width="full"
          style="highlight"
          onClick={ this.toggleQuestionBox }>
          Ask Question
        </Button>
      </div>
    );
  },

  renderExpanded() {
    return(
      <section>
        <div>
          <Textarea
            placeholder="Your question here..."
          />
          <div className="push--top">
            <ButtonRow
              rightGroup={[
                <Button
                  key="1"
                  style="plain"
                  width="default"
                  onClick={ this.toggleQuestionBox }>
                  Cancel
                </Button>,
                <Button
                  key="2"
                  style="outline"
                  width="default">
                  Ask anonymously
                </Button>,
                <Button
                  key="3"
                  style="highlight"
                  width="default">
                  Submit question
                </Button>
              ]}
             />
          </div>
        </div>
      </section>
    )
  },

  render() {
    if (this.state.isCollapsed) {
      return this.renderCollapsed();
    }
    return this.renderExpanded();
  }
});
