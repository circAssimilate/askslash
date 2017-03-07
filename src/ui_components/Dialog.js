const React = require('react');

const {
  ButtonRow,
  Button,
} = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    dialogTitle: React.PropTypes.string.isRequired,
    dialogContent: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func,
    submitButtonText: React.PropTypes.string,
    cancelButtonText: React.PropTypes.string,
    style: React.PropTypes.string,
  },

  getInitialState() {
    return {
      hidden: false,
      newMeeting: {},
    };
  },

  hideDialog() {
    this.setState({'hidden': true});
  },

  onCancel() {
    this.hideDialog();
  },

  onSubmit() {
    console.log('SUBMITTTED');

    this.hideDialog();
  },

  renderHidden() {
    return null;
  },

  renderExpanded() {
    return (
      <div className="overlay dialog-background">
        <div className={ this.props.style === 'narrow' ? 'dialog dialog--narrow' : 'dialog' }>
          <div className="dialog__header">
            <div className="dialog__title">{ this.props.dialogTitle }</div>
          </div>
          <div className="dialog__body">
            { this.props.dialogContent() }
          </div>
          <div className="dialog__footer">
            <ButtonRow
              rightGroup={[
                <Button
                  key="1"
                  style="plain"
                  width="default"
                  onClick={ this.onCancel }>
                  { this.props.cancelButtonText }
                </Button>,
                <Button
                  key="2"
                  style="highlight"
                  width="default"
                  onClick={ this.onSubmit }>
                  { this.props.submitButtonText }
                </Button>
              ]}
            />
          </div>
          <div onClick={ this.onCancel }
                className="dialog__close">
            <svg className="icon">
              <use xlinkHref="#close-16"></use>
            </svg>
          </div>
        </div>
      </div>
    );
  },

  render() {
    if (this.state.hidden) {
      return this.renderHidden();
    } else {
      return this.renderExpanded();
    }
  }
});
