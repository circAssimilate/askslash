import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { Immutable, toImmutable } from 'nuclear-js';

import Dialog from 'app/components/ui/Dialog';

import questionsModule from 'app/modules/questions';

import {
  Checkbox,
  Input,
  Radio,
} from 'optimizely-oui';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.setPropertyFromEvent = this.setPropertyFromEvent.bind(this);
    this.setNextState = this.setNextState.bind(this);
    this.dialogContent = this.dialogContent.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      isSubmitDisabled: false,
      isSubmitting: false,
      form: toImmutable({
        name: '',
        shortName: '',
      }),
    };
  }

  setPropertyFromEvent(event, property, value, shouldNegate = false) {
    const valueToSet = shouldNegate ? !event.target[value] : event.target[value];
    this.setNextState({
      form: this.state.form.set(property, valueToSet),
    });
  }

  setNextState(nextState) {
    this.setState(nextState, () => {
      this.setState({
        isSubmitDisabled: !this.state.form.get('name'),
      });
    });
  }

  dialogContent() {
    return(
      <form>
        <fieldset>
          <ol className="form-fields">
            <li className="form-field__item">
              <label className="oui-label">Fixed-width Input</label>
              <Input onChange={ _.partialRight(this.setPropertyFromEvent, 'testProperty', 'value') }
                     type="text"
              />
            </li>
            <li className="form-field__item">
              <div className="grid">
                <div className="grid__cell">
                  <label className="oui-label">Split Inputs</label>
                  <Input onChange={ _.partialRight(this.setPropertyFromEvent, 'testProperty', 'value') }
                         placeholder="This is placeholder"
                         type="text"
                  />
                </div>
                <div className="grid__cell">
                  <label className="oui-label">Split Inputs</label>
                  <Input onChange={ _.partialRight(this.setPropertyFromEvent, 'testProperty', 'value') }
                         placeholder="This is placeholder"
                         type="text"
                  />
                </div>
              </div>
            </li>
            <li className="form-field__item">
              <div className="grid">
                <div className="grid__cell">
                  <label className="oui-label">Split Inputs</label>
                  <Input
                    onChange={ _.partialRight(this.setPropertyFromEvent, 'testProperty', 'value') }
                    placeholder="This is placeholder"
                    type="text"
                  />
                </div>
                <div className="grid__cell">
                  <label className="oui-label">Split Inputs</label>
                  <select name="zoo" id="zoo" className="select">
                    <option value="one">This is option one</option>
                    <option value="two">And this is option two</option>
                  </select>
                </div>
              </div>
            </li>
            <li className="form-field__item">
              <ul className="input-list">
                <li className="oui-label">Checklist</li>
                <li>
                  <Checkbox
                    label="Send me email notifications when I am projected to or have exceeded my plan limits"
                    onChange={ _.partialRight(this.setPropertyFromEvent, 'testProperty', 'checked') }
                  />
                </li>
                <li>
                  <Checkbox
                    label="Send me email summaries of my experiment results"
                    onChange={ _.partialRight(this.setPropertyFromEvent, 'testProperty', 'checked') }
                  />
                </li>
              </ul>
            </li>
            <li className="form-field__item">
              <ul className="input-list">
                <li className="oui-label">Radio List</li>
                <li>
                  <Radio
                    defaultChecked
                    label="First Value"
                    name="radio-list-example"
                  />
                </li>
                <li>
                  <Radio
                    label="Second Value"
                    name="radio-list-example"
                  />
                </li>
                <li>
                  <Radio
                    isDisabled
                    label="Third Value"
                    name="radio-list-example"
                  />
                </li>
              </ul>
            </li>
          </ol>
        </fieldset>
      </form>
    );
  }

  onSave() {
    console.log('Save Settings');
  }

  render() {
    return(
       <Dialog
        onSubmit={ this.onSave }
        hideDialog={ this.props.hideComponent }
        isSubmitDisabled={ this.state.isSubmitDisabled }
        style="default"
        submitButtonText="Save"
        cancelButtonText="Cancel"
        dialogTitle="Settings"
        dialogContent={ this.dialogContent }
      />
    )
  }
};

Settings.propTypes = {
  refreshAppData: PropTypes.func.isRequired,
  hideComponent: PropTypes.func.isRequired,
};

export default Settings
