'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { InviteeListNavigationBarContainer, InviteeListContainer } from '../containers';

export default class InviteeListScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let projectId = this.props.route.passProps.projectId;
    let meId = this.props.route.passProps.meId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <InviteeListNavigationBarContainer navigator={navigator} projectId={projectId} meId={meId} />
        <InviteeListContainer navigator={navigator} projectId={projectId} meId={meId} />
      </View>
    );
  }
}
