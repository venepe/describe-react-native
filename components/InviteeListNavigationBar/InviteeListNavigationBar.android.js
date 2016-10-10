'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, ToolbarAndroid, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import { CreateInviteeScene } from '../../scenes';

class InviteeListNavigationBar extends Component {
  constructor(props) {
    super(props);
    this._onActionSelected = this._onActionSelected.bind(this);
  }

  _onActionSelected() {
    const projectId = this.props.project.id;
    const meId = this.props.me.id;
    const navigator = this.props.navigator;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromBottom,
        component: CreateInviteeScene,
        passProps: {projectId, meId, navigator}
    });
  }

  render() {
    return (
      <ToolbarAndroid title={'Invited'} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Add Collaborator', icon: require('image!ic_add'), show: 'always'}]} onActionSelected={this._onActionSelected}/>
    );
  }
}

export default Relay.createContainer(InviteeListNavigationBar, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
      }
    `,
  },
});
