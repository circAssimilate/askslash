import React from 'react';
import ReactDOM from 'react-dom';
import redux from 'app/modules/main/store'
import { Provider } from 'react-redux';

import Ask from 'app/components/ask'

import ouiIcons from 'oui-icons'
import 'assets/stylesheets/base.scss'
import 'assets/stylesheets/styles.scss'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="app">
        <div className="display--none" dangerouslySetInnerHTML={ {__html: ouiIcons} }></div>
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
  <Provider store={redux}>
    <App />
  </Provider>,
  document.getElementById('root')
);
