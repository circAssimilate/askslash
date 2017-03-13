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
    refreshAppData: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      isSubmitDisabled: true,
      isSubmitting: false,
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
    this.setState(nextState, () => {
      this.setState({
        isSubmitDisabled: !this.state.form.get('question'),
      });
    });
  },

  onSubmit() {
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
          this.props.refreshAppData();
      });
  },

  render() {
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
    );
  },
});
