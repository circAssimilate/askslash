const _ = require('lodash');
const React = require('react');
const { Immutable, toImmutable } = require('nuclear-js');

const modules = require('../modules');

const {
  ButtonRow,
  Button,
  Checkbox,
  Textarea,
} = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    getQuestions: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      isCollapsed: false,
      errors: [],
      formSubmitted: false,
      form: toImmutable({
        anonymous: false,
        question: '',
      }),
    };
  },

  setPropertyFromEvent(event, property, value, shouldNegate = false) {
    const valueToSet = shouldNegate ? !event.target[value] : event.target[value];
    this.setNextState({
      form: this.state.form.set(property, valueToSet),
    });
  },

  setNextState(nextState) {
    // console.log('nextState', toImmutable(nextState).toJS());
    this.setState(nextState, () => {
      // If user has already attempted to submit form, validate form data and give user feedback.
      if (this.state.formSubmitted) {
        const errors = this.getErrors();

        this.setState({
          errors: errors,
        });
      }
    });
  },

  getErrors() {
    return []
  },

  onSubmit() {
    const errors = this.getErrors();

    // If there are any errors, show error notifications and then return immediately.
    if (errors.size) {
      this.setState({
        errors: errors,
        formSubmitted: true,
      });
      errors.forEach(error => {
        alert(error.message)
      });
      return;
    }

    // const question = 'Hi. Is this thing on? #test [#testBold](https://google.com) *italics*, **bold** [Google.com](https://google.com)?';
    // const randomHour = Math.floor(Math.random() * 24);
    // const date = `Wed Mar 01 2017 ${randomHour}:25:57 GMT-0800 (PST)`;

    const data = {
      author: this.state.form.get('anonymous') ? 'Anonymous' : 'derek@optimizely.com',
      channel: modules.enums.channel.WEB,
      date : new Date(),
      meeting: '9876543',
      question: this.state.form.get('question'),
    };

    modules.actions.postQuestion(data)
      .done(response => {
        console.log('response', response);
          this.props.getQuestions();
      })
      .fail(err => {
        console.log('There was an error retrieving questinos', err);
      });
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
          Ask a Question
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
            onChange={ _.partialRight(this.setPropertyFromEvent, 'question', 'value') }
          />

          <div className="push--top">
            <Checkbox
              label="Submit Anonymously"
              onChange={ _.partialRight(this.setPropertyFromEvent, 'anonymous', 'checked') }
            />
          </div>

          <div className="push--top">
            <ButtonRow
              rightGroup={[
                <Button
                  key="1"
                  style="plain"
                  width="default"
                  onClick={ this.toggleQuestionBox }>
                  Hide
                </Button>,
                <Button
                  key="2"
                  onClick={ this.onSubmit }
                  style="highlight"
                  width="default">
                  Post
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
