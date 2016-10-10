'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { TestCaseEventNavigationBarContainer, FulfillmentEventListContainer } from '../containers';

export default class FulfillmentEventScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let fulfillmentId = this.props.route.passProps.fulfillmentId;
    let projectId = this.props.route.passProps.projectId;
    let testCaseId = this.props.route.passProps.testCaseId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <TestCaseEventNavigationBarContainer navigator={navigator} testCaseId={testCaseId} projectId={projectId} />
        <FulfillmentEventListContainer navigator={navigator} fulfillmentId={fulfillmentId} testCaseId={testCaseId} projectId={projectId} />
      </View>
    );
  }
}
