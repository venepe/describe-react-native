'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import SMTINavigationBar from '../SMTINavigationBar';
import AddNavigationButton from '../AddNavigationButton';
import { CreateInviteeScene } from '../../scenes';

class InviteeListNavigationBar extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
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
      <SMTINavigationBar title={'Invited'} rightButton={<AddNavigationButton onPress={this._onPress} />} navigator={this.props.navigator} />
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
