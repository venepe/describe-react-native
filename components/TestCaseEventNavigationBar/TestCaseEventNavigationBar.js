'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import SMTINavigationBar from '../SMTINavigationBar';

class TestCaseEventNavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let testCase = this.props.testCase || {};
    let title = testCase.text;
    return (
      <SMTINavigationBar title={title} navigator={this.props.navigator} />
    );
  }
}

export default Relay.createContainer(TestCaseEventNavigationBar, {
  fragments: {
    testCase: () => Relay.QL`
      fragment on TestCase {
        id
        text
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
      }
    `,
  },
});
