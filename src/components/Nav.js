const $ = require('jquery');
const React = require('react');

const { ArrowsInline } = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    selectedMeeting: React.PropTypes.object.isRequired,
    meetingList: React.PropTypes.array.isRequired,
    togglePresentationMode: React.PropTypes.func.isRequired,
    toggleSettingsView: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      menuOpen: false,
    };
  },

  componentDidMount() {
    $(document).keyup(event => {
      if (event.keyCode == 27) {
        this.setState({menuOpen: false});
      }
    });

    $(document).click(event => {
      if(!$(event.target).closest('[data-ui-hook="current-meeting"]').length) {
        if($('[data-ui-hook="nav-list"]').is(":visible")) {
          this.setState({menuOpen: false});
        }
      }
    })
  },

  toggleMenu() {
    this.setState({menuOpen: !this.state.menuOpen});
  },

  render() {
    return(
      <div>
        <nav className="reverse text--center">
          <div className="dropdown-group">
            <h1 data-ui-hook="current-meeting"
                className="display-inline--block noselect"
                onMouseDown={ this.toggleMenu }
                onMouseUp={ this.props.onMouseUp }>
              Ask<span className="push-half--sides">/</span><span className="weight--bold">{ this.props.selectedMeeting.name }</span> <ArrowsInline direction={ this.state.menuOpen ? 'up' : 'down' } />
            </h1>
            <ul data-ui-hook="nav-list"
                style={{display: this.state.menuOpen ? 'block' : 'none'}}
                className="dropdown width--200">
              <li onClick={ this.props.togglePresentationMode }
                  className="dropdown__item">
                <a className="dropdown__block-link">
                  <div className="flex">
                    <span className="flex flex-align--center">
                      <svg className="icon push-half--right ">
                        <use xlinkHref="#desktop-16"></use>
                      </svg>
                    </span>
                    <span className="flex flex-align--center">
                      Enter Presentation Mode
                    </span>
                  </div>
                </a>
              </li>
              <li onClick={ this.props.toggleSettingsView }
                  className="dropdown__item">
                <a className="flex">
                  <span className="flex flex-align--center">
                    <svg className="icon push-half--right ">
                      <use xlinkHref="#settings-16"></use>
                    </svg>
                  </span>
                  <span className="flex flex-align--center weight--bold">
                    Settings
                  </span>
                </a>
              </li>
              <li className="dropdown__item">
                <a className="flex">
                  <span className="flex flex-align--center">
                    <svg className="icon push-half--right ">
                      <use xlinkHref="#variation-settings-16"></use>
                    </svg>
                  </span>
                  <span className="flex flex-align--center weight--bold">
                    Meeting Options
                  </span>
                </a>
                <a className="dropdown__block-link">Create Meeting</a>
                <a className="dropdown__block-link">Delete Meeting</a>
                <a className="dropdown__block-link">Archive All Questions</a>
                <a className="dropdown__block-link">Show Archived Questions</a>
              </li>
              <li className="dropdown__item">
                <a className="flex">
                  <span className="flex flex-align--center">
                    <svg className="icon push-half--right ">
                      <use xlinkHref="#audiences-16"></use>
                    </svg>
                  </span>
                  <span className="flex flex-align--center weight--bold">
                    Meetings
                  </span>
                </a>
                { this.props.meetingList.map((meeting, index) => {
                  return (
                    <a data-meeting-id={ meeting.id }
                       className="dropdown__block-link"
                       key={index}>
                      { meeting.name }
                    </a>
                  );
                })}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});
