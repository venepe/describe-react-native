'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import SMTINavigationBar from '../SMTINavigationBar';
import CollaboratorListNavigationBar from '../CollaboratorListNavigationBar';
import SettingsNavigationButton from '../SettingsNavigationButton';
import { UpdateUserScene } from '../../scenes';

class MeNavigationBar extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    meId: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    projectId: '',
    meId: '',
    title: ''
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    let navigator = this.props.navigator;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.FloatFromRight,
        component: UpdateUserScene,
        passProps: {navigator, meId: this.props.meId}
    })
  }

  render() {
    return (
      <SMTINavigationBar title={'Profile'} rightButton={<SettingsNavigationButton onPress={this._onPress} side='right' />} navigator={this.props.navigator} />
    );
  }
}

export default MeNavigationBar;
