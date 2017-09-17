import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import QuestionCreator from './question_creator'
import Questions from './questions'

class ListMode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    <div>
      <QuestionCreator
        refreshAppData={ this.refreshAppData }
        selectedMeeting={ this.state.selectedMeeting }
      />
      <Questions
        questions={ this.props.questions }
      />
    </div>
  }
};

ListMode.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default ListMode
