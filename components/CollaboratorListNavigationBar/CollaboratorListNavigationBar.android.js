'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, ToolbarAndroid, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import { hasAddEdgePerm } from '../../lib/permissions';
import { InviteeListScene } from '../../scenes';

class CollaboratorListNavigationBar extends Component {
  constructor(props) {
    super(props);
    this._onActionSelected = this._onActionSelected.bind(this);
    this._getActions = this._getActions.bind(this);
  }

  _onActionSelected() {
    const project = this.props.project || {}
    const me = this.props.me || {}
    const projectId = project.id;
    const meId = me.id;
    const navigator = this.props.navigator;

    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: InviteeListScene,
        passProps: {projectId, meId, navigator}
    });
  }

  _getActions() {
    let actions = [];
    if (hasAddEdgePerm(this.props.project.permission)) {
      return [{title: 'Invited', icon: require('image!ic_group_add'), show: 'always'}];
    }
  }

  render() {
    let project = this.props.project || {};
    let title = project.text;
    return (
      <ToolbarAndroid title={title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={this._getActions()} onActionSelected={this._onActionSelected}/>
    );
  }
}

export default Relay.createContainer(CollaboratorListNavigationBar, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
        text
        permission
      }
    `,
  },
});
