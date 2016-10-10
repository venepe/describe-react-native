'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import ContactListNavigationBar from '../components/ContactListNavigationBar';
import { ContactListContainer } from '../containers';

export default class TestCaseScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let meId = this.props.route.passProps.meId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <ContactListNavigationBar title={'Contacts'} navigator={navigator} meId={meId} />
        <ContactListContainer navigator={navigator} meId={meId} />
      </View>
    );
  }
}
