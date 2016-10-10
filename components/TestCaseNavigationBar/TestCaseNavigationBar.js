'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import SMTINavigationBar from '../SMTINavigationBar';

class TestCaseNavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let project = this.props.project || {};
    let title = project.text;
    return (
      <SMTINavigationBar title={title} navigator={this.props.navigator} />
    );
  }
}

export default Relay.createContainer(TestCaseNavigationBar, {
  fragments: {
    testCase: () => Relay.QL`
      fragment on TestCase {
        id
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
        text
      }
    `,
  },
});
