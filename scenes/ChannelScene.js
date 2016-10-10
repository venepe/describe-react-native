'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { ChannelNavigationBarContainer, MessageListContainer } from '../containers';

export default class TestCaseScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let title = this.props.route.passProps.title;
    let channelId = this.props.route.passProps.channelId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <ChannelNavigationBarContainer navigator={navigator} channelId={channelId} title={title} />
        <MessageListContainer navigator={navigator} channelId={channelId} />
      </View>
    );
  }
}
