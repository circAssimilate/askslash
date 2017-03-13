const _ = require('lodash');
const React = require('react');
const { Immutable, toImmutable } = require('nuclear-js');

const Dialog = require('../ui_components/Dialog');

const modules = require('../modules');

const {
  Button,
  Input,
} = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    refreshAppData: React.PropTypes.func.isRequired,
    toggleVisibility: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      isSubmitDisabled: true,
      isSubmitting: false,
      form: toImmutable({
        name: '',
        shortId: '',
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
        isSubmitDisabled: !this.state.form.get('name'),
      });
    });
  },

  dialogContent() {
    return(
      <form>
        <div className="form__header">
          <p>Give us some more details on this meeting.</p>
        </div>
        <fieldset>
          <ol className="form-fields">
            <li className="form-field__item">
              <label className="oui-label oui-label--required">Meeting Name</label>
              <Input
                placeholder="Company All Hands"
                onChange={ _.partialRight(this.setPropertyFromEvent, 'name', 'value') }
                type="text"/>
            </li>
            <li className="form-field__item">
              <label className="oui-label">
                Meeting Short Name
                <span className="oui-label__optional">(Optional)</span>
              </label>
              <div className="button-group">
                <Button isDisabled>/</Button>
                <Input
                  placeholder="allhands"
                  onChange={ _.partialRight(this.setPropertyFromEvent, 'shortId', 'value') }
                  type="text"/>
              </div>
            </li>
          </ol>
        </fieldset>
      </form>
    );
  },

  onSubmit() {
    const data = {
      creator: 'derek@optimizely.com',
      name: this.state.form.get('name'),
      short_id: this.state.form.get('shortId'),
      date: new Date(),
    };
    modules.actions.createMeeting(data)
      .done(response => {
        console.log('response', response);
          this.props.refreshAppData();
      });
  },

  render() {
    return(
       <Dialog
        onSubmit={ this.onSubmit }
        hideDialog={ this.props.toggleVisibility }
        isSubmitDisabled={ this.state.isSubmitDisabled }
        style="default"
        submitButtonText="Create"
        cancelButtonText="Cancel"
        dialogTitle="New Meeting"
        dialogContent={ this.dialogContent }
      />
    )
  },
});
