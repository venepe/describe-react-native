'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, View } from 'react-native';
import Relay from 'react-relay';
import ActionButton from 'react-native-action-button';
const Icon = require('react-native-vector-icons/MaterialIcons');
const Ionicons = require('react-native-vector-icons/Ionicons');
import SMTINavigationBar from '../SMTINavigationBar';
import CloseNavigationButton from '../CloseNavigationButton';
import { hasUpdateNodePerm, hasAddEdgePerm } from '../../lib/permissions';

import { ChannelScene, CreateInviteeScene, CreateTestCaseScene, UpdateProjectScene } from '../../scenes';

class ProjectActionButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  static defaultProps = {
    onPress: function() {}
  }

  constructor(props) {
    super(props);
    this.onCreateTestCase = this.onCreateTestCase.bind(this);
    this.onInviteColloborator = this.onInviteColloborator.bind(this);
    this.onUpdateProject = this.onUpdateProject.bind(this);
  }

  onCreateTestCase() {
    let navigator = this.props.navigator;
    let projectId = this.props.project.id;
    let meId = this.props.me.id;
    navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromBottom,
        component: CreateTestCaseScene,
        passProps: {navigator, projectId, meId}
    });
  }

  onInviteColloborator() {
    let navigator = this.props.navigator;
    let projectId = this.props.project.id;
    let meId = this.props.me.id;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromBottom,
        component: CreateInviteeScene,
        passProps: {projectId, meId, navigator}
    });
  }

  onUpdateProject() {
    let navigator = this.props.navigator;
    let projectId = this.props.project.id;
    let meId = this.props.me.id;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromBottom,
        component: UpdateProjectScene,
        passProps: {navigator, projectId, meId}
    });
  }

  render() {
    const permission = this.props.project.permission
    if (hasUpdateNodePerm(permission)) {
      return (
          <ActionButton buttonColor='#FF4081'>
            <ActionButton.Item buttonColor='#7C4DFF' title='Add Moment' onPress={this.onCreateTestCase}>
              <Ionicons name='android-add' style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#448AFF' title='Edit Event' onPress={this.onUpdateProject}>
              <Ionicons name='android-create' style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#FFD740' title='Invite' onPress={this.onInviteColloborator}>
              <Icon name='mail' style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
      );
  } else if (hasAddEdgePerm(permission)) {
      return (
          <ActionButton buttonColor='#FF4081'>
            <ActionButton.Item buttonColor='#7C4DFF' title='Add Moment' onPress={this.onCreateTestCase}>
              <Ionicons name='android-add' style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#FFD740' title='Invite' onPress={this.onInviteColloborator}>
              <Icon name='mail' style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  btn: {
    width: 56,
    height: 56,
    color: '#FF4081',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 30,
    right: 15,
    backgroundColor: 'transparent',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default Relay.createContainer(ProjectActionButton, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id
        permission
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  },
});
