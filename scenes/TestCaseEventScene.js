'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { TestCaseEventNavigationBarContainer, TestCaseEventListContainer } from '../containers';

export default class TestCaseEventScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let testCaseId = this.props.route.passProps.testCaseId;
    let projectId = this.props.route.passProps.projectId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <TestCaseEventNavigationBarContainer navigator={navigator} testCaseId={testCaseId} projectId={projectId} />
        <TestCaseEventListContainer navigator={navigator} testCaseId={testCaseId} projectId={projectId} />
      </View>
    );
  }
}
