'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, ToolbarAndroid, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import CollaboratorListNavigationBar from '../CollaboratorListNavigationBar';
import { MyInvitationsScene } from '../../scenes';

import { registerDidIntroduceInvitation } from '../../stores/SubscriptionStore';
import { DidIntroduceInvitationSubscription } from '../../subscriptions';

const groupAdd = require('image!ic_group_add');

class MyCollaborationsNavigationBar extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
  }

  static defaultProps = {
    openDrawer: function() {},
  }

  constructor(props) {
    super(props);
    this._onActionSelected = this._onActionSelected.bind(this);
    this.renderBar = this.renderBar.bind(this);
  }

  _onActionSelected() {
    let me = this.props.me || {};
    let meId = me.id;
    let navigator = this.props.navigator;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: MyInvitationsScene,
        passProps: {meId, navigator}
    });
  }

  renderBar() {
    let me = this.props.me || {};
    let invitations = me.invitations || {};
    let edges = invitations.edges || [];
    let numOfInvitations = edges.length;
    let title = 'Events';
    let navBar;
    if (numOfInvitations === 0) {
      navBar = (<ToolbarAndroid title={title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Invitations', icon: require('image!ic_group_add'), show: 'always'}]} onActionSelected={this._onActionSelected} navIcon={require('image!ic_more_horiz')} onIconClicked={this.props.openDrawer}/>)
    } else if (numOfInvitations === 1) {
      navBar = (<ToolbarAndroid title={title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Invitations', icon: require('image!ic_group_add_1'), show: 'always'}]} onActionSelected={this._onActionSelected} navIcon={require('image!ic_more_horiz')} onIconClicked={this.props.openDrawer}/>)
    } else if (numOfInvitations === 2) {
      navBar = (<ToolbarAndroid title={title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Invitations', icon: require('image!ic_group_add_2'), show: 'always'}]} onActionSelected={this._onActionSelected} navIcon={require('image!ic_more_horiz')} onIconClicked={this.props.openDrawer}/>)
    } else if (numOfInvitations === 3) {
      navBar = (<ToolbarAndroid title={title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Invitations', icon: require('image!ic_group_add_3'), show: 'always'}]} onActionSelected={this._onActionSelected} navIcon={require('image!ic_more_horiz')} onIconClicked={this.props.openDrawer}/>)
    } else if (numOfInvitations === 4) {
      navBar = (<ToolbarAndroid title={title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Invitations', icon: require('image!ic_group_add_4'), show: 'always'}]} onActionSelected={this._onActionSelected} navIcon={require('image!ic_more_horiz')} onIconClicked={this.props.openDrawer}/>)
    } else if (numOfInvitations === 5) {
      navBar = (<ToolbarAndroid title={title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Invitations', icon: require('image!ic_group_add_5'), show: 'always'}]} onActionSelected={this._onActionSelected} navIcon={require('image!ic_more_horiz')} onIconClicked={this.props.openDrawer}/>)
    } else if (numOfInvitations > 5) {
      navBar = (<ToolbarAndroid title={title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Invitations', icon: require('image!ic_group_add_gt'), show: 'always'}]} onActionSelected={this._onActionSelected} navIcon={require('image!ic_more_horiz')} onIconClicked={this.props.openDrawer}/>)
    } else {
      navBar = (<ToolbarAndroid title={title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Invitations', icon: require('image!ic_group_add'), show: 'always'}]} onActionSelected={this._onActionSelected} navIcon={require('image!ic_more_horiz')} onIconClicked={this.props.openDrawer}/>)
    }

    return navBar
  }

  render() {
    return (
      this.renderBar()
    );
  }
}

export default Relay.createContainer(MyCollaborationsNavigationBar, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        id
        invitations (first: 5) {
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
