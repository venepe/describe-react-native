'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import MeNavigationBar from '../components/MeNavigationBar';
import { MeContainer } from '../containers';

export default class TestCaseScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let meId = this.props.route.passProps.meId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <MeNavigationBar meId={meId} navigator={navigator} />
        <MeContainer navigator={navigator} meId={meId} />
      </View>
    );
  }
}
