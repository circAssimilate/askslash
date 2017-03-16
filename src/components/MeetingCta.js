const React = require('react');

const { ArrowsInline } = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    meetingShortId: React.PropTypes.string.isRequired,
    slackShortcut: React.PropTypes.string,
    phoneNumber: React.PropTypes.string,
    ctaIntervalInSeconds: React.PropTypes.number,
  },

  data: {
    ctaList: [],
  },

  getInitialState() {
    return {
      meetingCtaIndex: 0,
    };
  },

  renderSlack: function() {
    return (
      <div className="reverse text--center question-cta weight--light">
        Ask a question by typing <span className="color--brand">{this.props.slackShortcut} { this.props.meetingShortId } // and your question</span> anywhere in <span className="color--warning">Slack</span>
      </div>
    );
  },

  renderPhone: function() {
    return (
      <div className="reverse text--center question-cta weight--light">
        Text <span className="color--brand">{ this.props.meetingShortId } // and your question</span> to <span className="color--warning">{ this.props.phoneNumber }</span>
      </div>
    );
  },

  componentDidMount() {
    if (this.props.slackShortcut && this.props.phoneNumber) {
      this.data.ctaList.push(this.renderPhone);
      this.data.ctaList.push(this.renderSlack);
    } else if (this.props.slackShortcut) {
      this.data.ctaList.push(this.renderSlack);
    } else if (this.props.phoneNumber) {
      this.data.ctaList.push(this.renderPhone);
    }
    this.setState({meetingCtaIndex: 0});
  },

  render() {
    const ctaIndex = this.state.meetingCtaIndex;
    if (this.data.ctaList.length === 0) {
      return null;
    } else if (this.data.ctaList.length > 1) {
      setTimeout(() => {
        if (ctaIndex >= this.data.ctaList.length - 1) {
          this.setState({meetingCtaIndex: 0});
        } else {
          this.setState({meetingCtaIndex: ctaIndex + 1});
        }
      }, this.props.ctaIntervalInSeconds * 1000);
    }
    return this.data.ctaList[ctaIndex]();
  }
});
