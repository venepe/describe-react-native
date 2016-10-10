'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, ToolbarAndroid, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import { CollaboratorListScene } from '../../scenes';

class ProjectNavigationBar extends Component {
  constructor(props) {
    super(props);
    this._onActionSelected = this._onActionSelected.bind(this);
  }

  _onActionSelected() {
    const project = this.props.project || {}
    const me = this.props.me || {}
    const projectId = project.id;
    const meId = me.id;
    const navigator = this.props.navigator;

    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: CollaboratorListScene,
        passProps: {projectId, meId, navigator}
    });
  }

  render() {
    let project = this.props.project || {};
    let title = project.text;
    return (
      <ToolbarAndroid title={title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Collaborators', icon: require('image!ic_group'), show: 'always'}]} onActionSelected={this._onActionSelected}/>
    );
  }
}

export default Relay.createContainer(ProjectNavigationBar, {
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
