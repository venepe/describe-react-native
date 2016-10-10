'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { UserNavigationBarContainer, CoverImageContainer } from '../containers';

export default class TestCaseScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let coverImageId = this.props.route.passProps.coverImageId;
    let userId = this.props.route.passProps.userId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <UserNavigationBarContainer navigator={navigator} userId={userId} />
        <CoverImageContainer navigator={navigator} coverImageId={coverImageId} userId={userId} />
      </View>
    );
  }
}
