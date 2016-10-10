'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import SMTINavigationBar from '../SMTINavigationBar';
import GroupAddNavigationButton from '../GroupAddNavigationButton';
import { hasAddEdgePerm } from '../../lib/permissions';
import { InviteeListScene } from '../../scenes';

class CollaboratorListNavigationBar extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this._renderRightButton = this._renderRightButton.bind(this);
  }

  _onPress() {
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

  _renderRightButton() {
    if (hasAddEdgePerm(this.props.project.permission)) {
      return (
        <GroupAddNavigationButton onPress={this._onPress} />
      );
    }
  }

  render() {
    let project = this.props.project || {};
    let title = project.text;
    return (
      <SMTINavigationBar title={title} rightButton={this._renderRightButton()} navigator={this.props.navigator} />
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
