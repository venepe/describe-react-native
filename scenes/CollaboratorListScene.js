'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { CollaboratorListNavigationBarContainer, CollaboratorListContainer } from '../containers';

export default class CollaboratorListScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let projectId = this.props.route.passProps.projectId;
    let meId = this.props.route.passProps.meId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <CollaboratorListNavigationBarContainer navigator={navigator} projectId={projectId} meId={meId} />
        <CollaboratorListContainer navigator={navigator} projectId={projectId} meId={meId} />
      </View>
    );
  }
}
