'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import SMTINavigationBar from '../SMTINavigationBar';
import GroupAddNavigationButton from '../GroupAddNavigationButton';
import SettingsNavigationButton from '../SettingsNavigationButton';
import { MyInvitationsScene } from '../../scenes';

class MyCollaborationsPlaceholderBar extends Component {
  static propTypes = {
    meId: PropTypes.string,
    openDrawer: PropTypes.func
  }

  static defaultProps = {
    meId: '',
    openDrawer: function() {},
  }

  constructor(props) {
    super(props);
    this._pushInvitations = this._pushInvitations.bind(this);
  }

  _pushInvitations() {
    let meId = this.props.meId;
    let navigator = this.props.navigator;

    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: MyInvitationsScene,
        passProps: {meId, navigator}
    });
  }

  render() {
    return (
      <SMTINavigationBar title={'Events'} leftButton={<SettingsNavigationButton onPress={this.props.openDrawer} />} rightButton={<GroupAddNavigationButton onPress={this._pushInvitations} />} navigator={this.props.navigator} hidePrev={true} />
    );
  }
}

export default MyCollaborationsPlaceholderBar;
