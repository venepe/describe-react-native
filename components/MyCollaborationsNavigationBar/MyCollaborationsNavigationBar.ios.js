'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import SMTINavigationBar from '../SMTINavigationBar';
import GroupAddNavigationButton from '../GroupAddNavigationButton';
import SettingsNavigationButton from '../SettingsNavigationButton';
import { MyInvitationsScene } from '../../scenes';

import { registerDidIntroduceInvitation } from '../../stores/SubscriptionStore';
import { DidIntroduceInvitationSubscription } from '../../subscriptions';

class MyCollaborationsNavigationBar extends Component {
  static propTypes = {
    openDrawer: PropTypes.func
  }

  static defaultProps = {
    openDrawer: function() {},
  }

  constructor(props) {
    super(props);
    this._pushInvitations = this._pushInvitations.bind(this);
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  subscribe() {
    if (this.props.me) {
      let me = this.props.me || {};
      let meId = me.id || '';

      registerDidIntroduceInvitation({meId}, () => {
        return Relay.Store.subscribe(
          new DidIntroduceInvitationSubscription({me})
        );
      });
    }
  }

  _pushInvitations() {
    let me = this.props.me || {};
    let meId = me.id;
    let navigator = this.props.navigator;

    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: MyInvitationsScene,
        passProps: {meId, navigator}
    });
  }

  render() {
    let me = this.props.me || {};
    let invitations = me.invitations || {};
    let edges = invitations.edges || [];
    let numOfInvitations = edges.length;
    return (
      <SMTINavigationBar title={'Events'} leftButton={<SettingsNavigationButton onPress={this.props.openDrawer} />} rightButton={<GroupAddNavigationButton numOfInvitations={numOfInvitations} onPress={this._pushInvitations} />} navigator={this.props.navigator} hidePrev={true} />
    );
  }
}

export default Relay.createContainer(MyCollaborationsNavigationBar, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        id
        invitations (first: 6) {
          edges {
            node {
              id
            }
          }
        }
        ${DidIntroduceInvitationSubscription.getFragment('me')},
      }
    `,
  },
});
