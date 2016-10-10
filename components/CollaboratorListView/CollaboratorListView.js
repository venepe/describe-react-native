'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Image, ListView, Navigator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import CollaboratorList from '../CollaboratorList';
import { UserScene } from '../../scenes';

class CollaboratorListView extends Component {
  static propTypes = {
    onPressRow: PropTypes.func,
    onEndReached: PropTypes.func,
  }

  static defaultProps = {
    onPressRow: function() {},
    onEndReached: function() {},
  }

  constructor(props) {
    super(props);
    this._onPressRow = this._onPressRow.bind(this);
  }

  _onPressRow(collaborator) {
    let userId = collaborator.profile.id;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: UserScene,
        passProps: {userId}
    });
  }

  render() {
    return (
      <CollaboratorList project={this.props.project} onPressRow={this._onPressRow} />
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

export default Relay.createContainer(CollaboratorListView, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id
        ${CollaboratorList.getFragment('project')},
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  },
});
