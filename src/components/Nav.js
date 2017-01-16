const React = require('react');

const { ArrowsInline } = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    meetingName: React.PropTypes.string.isRequired,
    meetingId: React.PropTypes.string.isRequired,
    slackShortcut: React.PropTypes.string,
    phoneNumber: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      arrowDirection: 'down',
    };
  },

  render: function () {

    let postInfo;

    if (this.props.slackShortcut && this.props.phoneNumber) {
      postInfo = <div>Slack <span className="color--brand">{this.props.slackShortcut} {'//'} {this.props.meetingId}</span> OR text <span className="color--brand">{'//'} {this.props.meetingId} and your question</span> to {this.props.phoneNumber}</div>;
    } else if (this.props.slackShortcut) {
      postInfo = <div>Slack <span className="color--brand">{this.props.slackShortcut} {'//'} {this.props.meetingId}</span> your question</div>;
    } else if (this.props.phoneNumber) {
      postInfo = <div>Text <span className="color--brand">{'//'} {this.props.meetingId} and your question</span> to {this.props.phoneNumber}</div>;
    }

    return(
      <nav className="flex">
        <h1 className="display-inline--block flex--1">
          Ask<span className="push-half--sides">/</span><span className="weight--bold">{this.props.meetingName}</span> <ArrowsInline direction={ this.state.arrowDirection } />
        </h1>
        <h2 className="display-inline--block color--warning"
            style={{ fontSize: 14 }}>
          { postInfo }
        </h2>
      </nav>
    );
  }
});
