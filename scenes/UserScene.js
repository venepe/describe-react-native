'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { UserNavigationBarContainer, UserContainer } from '../containers';

export default class TestCaseScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let userId = this.props.route.passProps.userId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <UserNavigationBarContainer navigator={navigator} userId={userId} />
        <UserContainer navigator={navigator} userId={userId} />
      </View>
    );
  }
}
