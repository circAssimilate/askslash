import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';

import {
  ButtonRow,
  Button,
} from 'optimizely-oui';

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderButtonRow = this.renderButtonRow.bind(this);
    this.renderButtonRowWithCancel = this.renderButtonRowWithCancel.bind(this);
    this.renderCloseIcon = this.renderCloseIcon.bind(this);

    this.state = {
      newMeeting: {},
    };
  }

  componentDidMount() {
    $(document.body).on('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    $(document.body).off('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.keyCode == 27) { // Esc
      this.props.hideDialog();
    }
  }

  onSubmit() {
    this.props.onSubmit();
  }

  renderButtonRow() {
    return (
      <ButtonRow
        rightGroup={[
          <Button
            key="1"
            style="highlight"
            width="default"
            isDisabled={ this.props.isSubmitDisabled }
            onClick={ this.onSubmit }>
            { this.props.submitButtonText }
          </Button>
        ]}
      />
    );
  }

  renderButtonRowWithCancel() {
    return (
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
    );
  }

  renderCloseIcon() {
    return(
      <div onClick={ this.props.hideDialog }
            className="dialog__close">
        <svg className="icon">
          <use xlinkHref="#close-16"></use>
        </svg>
      </div>
    );
  }

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
            { this.props.hideCancelOptions ? this.renderButtonRow() : this.renderButtonRowWithCancel() }
          </div>
          { this.props.hideCancelOptions ? '' : this.renderCloseIcon() }
        </div>
      </div>
    );
  }
};

Dialog.propTypes = {
  cancelButtonText: PropTypes.string.isRequired,
  dialogContent: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  hideCancelOptions: PropTypes.bool.isRequired,
  hideDialog: PropTypes.func.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};

export default Dialog
