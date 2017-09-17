import { connect } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';

import Ask from 'app/components/ask'

import { ButtonRow, Button } from 'optimizely-oui';

import 'assets/stylesheets/base.scss'
import 'assets/stylesheets/styles.scss'

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <Ask/>
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
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
