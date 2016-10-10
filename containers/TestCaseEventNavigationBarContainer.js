'use strict';

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import TestCaseEventNavigationBar from '../components/TestCaseEventNavigationBar';
import { TestCaseRoute } from '../routes';

export default class TestCaseEventNavigationBarContainer extends Component {
  static propTypes = {
    testCaseId: PropTypes.string,
    projectId: PropTypes.string,
  }

  static defaultProps = {
    testCaseId: '',
    projectId: '',
  }

  constructor(props) {
    super(props);
  }

  render() {

    let testCaseId = this.props.testCaseId;
    let projectId = this.props.projectId;
    let testCaseRoute = new TestCaseRoute({testCaseId, projectId});

    return (
       <Relay.RootContainer Component={TestCaseEventNavigationBar} route={testCaseRoute} renderFetched={data => <TestCaseEventNavigationBar {...data} navigator={this.props.navigator} /> } />
    );
  }
}
