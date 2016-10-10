'use strict';

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import TestCaseNavigationBar from '../components/TestCaseNavigationBar';
import { TestCaseRoute } from '../routes';

export default class TestCaseNavigationBarContainer extends Component {
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
       <Relay.RootContainer Component={TestCaseNavigationBar} route={testCaseRoute} renderFetched={data => <TestCaseNavigationBar {...data} navigator={this.props.navigator} /> } />
    );
  }
}
