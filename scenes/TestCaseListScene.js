'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { ProjectNavigationBarContainer, TestCaseListContainer } from '../containers';

export default class TestCaseListScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let projectId = this.props.route.passProps.projectId;
    let meId = this.props.route.passProps.meId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <ProjectNavigationBarContainer navigator={navigator} projectId={projectId} meId={meId} />
        <TestCaseListContainer navigator={navigator} projectId={projectId} meId={meId} />
      </View>
    );
  }
}
