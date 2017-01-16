const React = require('react');

const {
  Checkbox,
  Button,
  Textarea
} = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    author: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      question: '',
      author: 'anonymous',
    };
  },

  render: function () {
    return(
      <div className="flex--1 soft">
        <Textarea/>
        <Checkbox
          label="Submit Anonymously" />
        <Button
          style="outline-reverse"
          width="full">
          Submit
        </Button>
      </div>
    );
  }
});
