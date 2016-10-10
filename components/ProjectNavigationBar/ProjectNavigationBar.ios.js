'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import SMTINavigationBar from '../SMTINavigationBar';
import GroupNavigationButton from '../GroupNavigationButton';
import { CollaboratorListScene } from '../../scenes';

class ProjectNavigationBar extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
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
      <SMTINavigationBar title={title} rightButton={<GroupNavigationButton onPress={this._onPress} />} navigator={this.props.navigator} />
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
