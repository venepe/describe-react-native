'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import SMTINavigationBar from '../SMTINavigationBar';
import AddNavigationButton from '../AddNavigationButton';
import { CreateContactScene } from '../../scenes';

class ContactListNavigationBar extends Component {
  static propTypes = {
    meId: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    meId: '',
    title: '',
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromBottom,
        component: CreateContactScene,
        passProps: {meId: this.props.meId, navigator: this.props.navigator}
    });
  }

  render() {
    return (
      <SMTINavigationBar title={this.props.title} rightButton={<AddNavigationButton onPress={this._onPress} />} navigator={this.props.navigator} />
    );
  }
}

export default ContactListNavigationBar;
