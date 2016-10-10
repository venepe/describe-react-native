'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import SMTINavigationBar from '../components/SMTINavigationBar';
import { MyInvitationsContainer } from '../containers';

export default class TestCaseScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let meId = this.props.route.passProps.meId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <SMTINavigationBar title={'Invitations'} navigator={navigator} />
        <MyInvitationsContainer navigator={navigator} meId={meId} />
      </View>
    );
  }
}
