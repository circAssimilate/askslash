const React = require('react');

const {
  ButtonRow,
  Button,
  Textarea
} = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    toggleSettingsView: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      settings: {},
    };
  },

  renderExpanded() {
    return (
      <div>
        <h1 data-ui-hook="current-meeting"
            className="display-inline--block reverse text--center">
          Ask<span className="push-half--sides">/</span><span className="weight--bold">Settings</span>
        </h1>
        <div className="reverse text--center push-double--bottom">
          <span>Update your organization's <span className="color--warning">settings</span> below.</span>
        </div>
        <ButtonRow
          centerGroup={[
            <Button
              key="1"
              style="default"
              width="full"
              onClick={ this.props.toggleSettingsView }>
              Close
            </Button>,
            <Button
              key="2"
              style="highlight"
              width="full">
              Save
            </Button>
          ]}
        />
        <section>
          <div>
            <div className="push--top">
              <form>
                <fieldset>
                  <ol className="form-fields">
                    <li className="form-field__item">
                      <label className="oui-label">Textarea</label>
                      <Textarea />
                    </li>
                    <li className="form-field__item">
                      <label className="oui-label">Fixed-width Input</label>
                      <input type="text" className="oui-text-input width-150" />
                    </li>
                    <li className="form-field__item">
                      <label className="oui-label">Fixed-width Input</label>
                      <input type="text" className="oui-text-input width-250" />
                    </li>
                    <li className="form-field__item">
                      <div className="grid">
                        <div className="grid__cell">
                          <label className="oui-label">Split Inputs</label>
                          <input type="text" className="oui-text-input" placeholder="This is placeholder" />
                        </div>
                        <div className="grid__cell">
                          <label className="oui-label">Split Inputs</label>
                          <input type="text" className="oui-text-input" placeholder="This is placeholder" />
                        </div>
                      </div>
                    </li>
                    <li className="form-field__item">
                      <div className="grid">
                        <div className="grid__cell">
                          <label className="oui-label">Split Inputs</label>
                          <input type="text" className="oui-text-input" placeholder="This is placeholder" />
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
                      <div className="grid">
                        <div className="grid__cell">
                          <label className="oui-label">Split Inputs</label>
                          <input type="text" className="oui-text-input" placeholder="This is placeholder" />
                        </div>
                        <div className="grid__cell">
                          <label className="oui-label">Split Inputs</label>
                          <input type="text" className="oui-text-input" placeholder="This is placeholder" />
                        </div>
                        <div className="grid__cell">
                          <label className="oui-label">Split Inputs</label>
                          <input type="text" className="oui-text-input" placeholder="This is placeholder" />
                        </div>
                      </div>
                    </li>
                    <li className="form-field__item">
                      <label className="oui-label">Fill Space</label>
                      <div className="grid">
                        <div className="grid__cell">
                          <input type="text" className="oui-text-input" placeholder="This is placeholder" />
                        </div>
                        <div className="push-double--left">
                          <button className="oui-button oui-button--highlight">Do This</button>
                        </div>
                      </div>
                    </li>
                    <li className="form-field__item">
                      <label className="oui-label">Fill Space</label>
                      <div className="grid">
                        <div className="grid__cell">
                          <input type="text" className="oui-text-input" placeholder="This is placeholder" />
                        </div>
                        <div className="push-double--left">
                          <select name="zoo" id="zoo" className="select">
                            <option value="one">This is option one</option>
                            <option value="two">And this is option two</option>
                          </select>
                        </div>
                      </div>
                    </li>
                  </ol>
                </fieldset>
                <div className="or">or</div>
                <fieldset>
                  <ol className="form-fields">
                    <li className="oui-label">Checklist</li>
                    <li className="form-field__item">
                      <ul className="input-list">
                        <li>
                          <input name="foo-1" id="foo-1a" type="checkbox" checked="" /> <label className="oui-label" htmlFor="foo-1a">Send me email notifications when I am projected to or have exceeded my plan limits</label>
                        </li>
                        <li>
                          <input name="foo-2" id="foo-2a" type="checkbox" /> <label className="oui-label" htmlFor="foo-2a">Send me email summaries of my experiment results</label>
                        </li>
                      </ul>
                    </li>
                  </ol>
                </fieldset>
                <fieldset>
                  <ol className="form-fields">
                    <li className="form-field__item">
                      <label className="oui-label">Select one thing or another</label>
                      <select name="zoo" id="zoo" className="select">
                        <option value="one">This is option one</option>
                        <option value="two">And this is option two</option>
                      </select>
                    </li>
                    <li className="form-field__item">
                      <ul className="input-list">
                        <li>
                          <input name="radio-1" id="bar-1a" type="radio" checked="" /> <label className="oui-label" htmlFor="bar-1a">Radio 1</label>
                        </li>
                        <li>
                          <input name="radio-1" id="bar-2a" type="radio" disabled /> <label className="oui-label oui-label--disabled" htmlFor="bar-2a">Radio 2 with disabled label</label>
                        </li>
                        <li>
                          <input name="radio-1" id="bar-3a" type="radio" /> <label className="oui-label" htmlFor="bar-3a">Radio 3</label>
                        </li>
                      </ul>
                    </li>
                  </ol>
                </fieldset>
                <fieldset>
                  <ol className="form-fields">
                    <li className="form-field__item">
                      <label className="oui-label">Horizontal Inputs</label>
                      <p>Use these only for short inputs where there's no chance they will wrap.</p>
                      <ul className="input-list input-list--horizontal">
                        <li>
                          <input name="radio-1" id="bar-1b" type="radio" checked="" /> <label className="oui-label" htmlFor="bar-1b">Radio 1</label>
                        </li>
                        <li>
                          <input name="radio-1" id="bar-2b" type="radio" disabled /> <label className="oui-label oui-label--disabled" htmlFor="bar-2b">Radio 2 with disabled label</label>
                        </li>
                        <li>
                          <input name="radio-1" id="bar-3b" type="radio" /> <label className="oui-label" htmlFor="bar-3b">Radio 3</label>
                        </li>
                      </ul>
                    </li>
                    <li className="oui-label">Checklist</li>
                    <li className="form-field__item">
                      <ul className="input-list input-list--horizontal">
                        <li>
                          <input name="foo-1" id="foo-1b" type="checkbox" checked="" /> <label className="oui-label" htmlFor="foo-1b">Short option</label>
                        </li>
                        <li>
                          <input name="foo-2" id="foo-2b" type="checkbox" /> <label className="oui-label" htmlFor="foo-2b">Another short option</label>
                        </li>
                      </ul>
                    </li>
                  </ol>
                </fieldset>
              </form>
              <ButtonRow
                rightGroup={[
                  <Button
                    key="1"
                    style="plain"
                    width="default"
                    onClick={ this.props.toggleSettingsView }>
                    Close
                  </Button>,
                  <Button
                    key="2"
                    style="highlight"
                    width="default">
                    Save
                  </Button>
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    );
  },

  render() {
    return this.renderExpanded();
  }
});
