const $ = require('jquery');
const React = require('react');

const {
  ButtonRow,
  Button,
} = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    dialogTitle: React.PropTypes.string.isRequired,
    dialogContent: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    hideDialog: React.PropTypes.func.isRequired,
    isSubmitDisabled: React.PropTypes.bool.isRequired,
    submitButtonText: React.PropTypes.string.isRequired,
    cancelButtonText: React.PropTypes.string.isRequired,
    style: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      newMeeting: {},
    };
  },

  componentDidMount: function() {
    $(document.body).on('keydown', this.handleKeyDown);
  },

  componentWillUnmount() {
    $(document.body).off('keydown', this.handleKeyDown);
  },

  handleKeyDown(event) {
    if (event.keyCode == 27) { // Esc
      this.props.hideDialog();
    }
  },

  onSubmit() {
    this.props.onSubmit();
  },

  render() {
    return (
      <div className="overlay dialog-container" onKeyDown={ this.handleKeyDown }>
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
                  onClick={ this.props.hideDialog }>
                  { this.props.cancelButtonText }
                </Button>,
                <Button
                  key="2"
                  style="highlight"
                  width="default"
                  isDisabled={ this.props.isSubmitDisabled }
                  onClick={ this.onSubmit }>
                  { this.props.submitButtonText }
                </Button>
              ]}
            />
          </div>
          <div onClick={ this.props.hideDialog }
                className="dialog__close">
            <svg className="icon">
              <use xlinkHref="#close-16"></use>
            </svg>
          </div>
        </div>
      </div>
    );
  },
});
