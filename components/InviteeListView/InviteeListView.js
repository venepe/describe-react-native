'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Image, ListView, Navigator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import InviteeList from '../InviteeList';
import { UserScene } from '../../scenes';

class InviteeListView extends Component {
  static propTypes = {
    onPressRow: PropTypes.func,
    onEndReached: PropTypes.func
  }

  static defaultProps = {
    onPressRow: function() {},
    onEndReached: function() {}
  }

  constructor(props) {
    super(props);
    this._onPressRow = this._onPressRow.bind(this);
  }

  _onPressRow(invitee) {
    let userId = invitee.profile.id;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: UserScene,
        passProps: {userId}
    });
  }

  render() {
    return (
      <InviteeList project={this.props.project} onPressRow={this._onPressRow} />
    );
  }
}


const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default Relay.createContainer(InviteeListView, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id
        ${InviteeList.getFragment('project')},
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  },
});
