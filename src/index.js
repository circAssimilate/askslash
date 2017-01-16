require('./assets/stylesheets/base.scss');
const React = require('react');
const ReactDOM = require('react-dom');

const Nav = require('./components/Nav');
const Questions = require('./components/Questions');
const CommentBox = require('./components/CommentBox');

const App = React.createClass({
  render: function () {
    let dummyQuestions = [
      {
        text: "Is this really a question?",
        date: "February 8, 1999 - 4:22am",
        author: "Derek Hammond",
      },
      {
        text: "Check 123?",
        date: "August 6, 2016 - 2:15pm",
        author: "Jane Doe",
      },
      {
        text: "Hola, como estas?",
        date: "November 5, 2013 - 12:04am",
        author: "John Doe",
      },
      {
        text: "Is this really a question?",
        date: "February 8, 1999 - 4:22am",
        author: "Derek Hammond",
      },
      {
        text: "Check 123?",
        date: "August 6, 2016 - 2:15pm",
        author: "Jane Doe",
      },
      {
        text: "Hola, como estas?",
        date: "November 5, 2013 - 12:04am",
        author: "John Doe",
      },
      {
        text: "Is this really a question?",
        date: "February 8, 1999 - 4:22am",
        author: "Derek Hammond",
      },
      {
        text: "Check 123?",
        date: "August 6, 2016 - 2:15pm",
        author: "Jane Doe",
      },
      {
        text: "Hola, como estas?",
        date: "November 5, 2013 - 12:04am",
        author: "John Doe",
      }
    ];

    return (
      <div className="soft">
        <Nav
          meetingName="Global Show & Tell"
          meetingId="gst"
          slackShortcut="/ask"
          phoneNumber="6144-OPTIFY (614-467-8439)"/>
        <main className="flex">
          <CommentBox
            author='derek@optimizely.com'/>
          <Questions
            questions={ dummyQuestions } />
        </main>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
