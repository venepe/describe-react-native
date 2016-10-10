'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import SMTINavigationBar from '../components/SMTINavigationBar';
import { FileImageContainer } from '../containers';

export default class FileScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let title = this.props.route.passProps.title;
    let fileId = this.props.route.passProps.fileId;
    let navigator = this.props.navigator;

    return (
      <View style={{flex: 1}}>
        <SMTINavigationBar title={title} navigator={navigator} />
        <FileImageContainer navigator={navigator} fileId={fileId} />
      </View>
    );
  }
}
