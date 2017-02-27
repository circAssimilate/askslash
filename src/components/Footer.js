const React = require('react');

const Question = require('./Question');

module.exports = React.createClass({
  render() {
    return(
      <footer>
        <ul className="text--right reverse">
          <li className="display--inline-block soft--sides soft-half--top">
            <a href="https://askslash.us">AskSlash.us</a>
          </li>
          <li className="display--inline-block soft--sides soft-half--top">
            <a href="https://github.com/circAssimilate/askslash">Github</a>
          </li>
        </ul>
      </footer>
    );
  }
});
