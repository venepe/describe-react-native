'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { TestCaseNavigationBarContainer, TestCaseContainer } from '../containers';

export default class TestCaseScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let testCaseId = this.props.route.passProps.testCaseId;
    let projectId = this.props.route.passProps.projectId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <TestCaseNavigationBarContainer navigator={navigator} testCaseId={testCaseId} projectId={projectId} />
        <TestCaseContainer navigator={navigator} testCaseId={testCaseId} projectId={projectId} />
      </View>
    );
  }
}
