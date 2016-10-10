'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, ToolbarAndroid, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import CollaboratorListNavigationBar from '../CollaboratorListNavigationBar';
import { MyInvitationsScene } from '../../scenes';

class MyCollaborationsPlaceholderBar extends Component {
  static propTypes = {
    meId: PropTypes.string,
    openDrawer: PropTypes.func,
  }

  static defaultProps = {
    meId: '',
    openDrawer: function() {},
  }

  constructor(props) {
    super(props);
    this._onActionSelected = this._onActionSelected.bind(this);
  }

  _onActionSelected() {
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: MyInvitationsScene,
        passProps: {meId: this.props.meId, navigator: this.props.navigator}
    });
  }

  render() {
    return (
      <ToolbarAndroid title={'Events'} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Invitations', icon: require('image!ic_group_add'), show: 'always'}]} onActionSelected={this._onActionSelected} navIcon={require('image!ic_more_horiz')} onIconClicked={this.props.openDrawer}/>
    );
  }
}

export default MyCollaborationsPlaceholderBar;
