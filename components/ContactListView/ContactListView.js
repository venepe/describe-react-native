'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Image, ListView, Navigator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import ContactList from '../ContactList';
import { UserScene } from '../../scenes';

class ContactListView extends Component {
  static propTypes = {
    onPressRow: PropTypes.func,
    onEndReached: PropTypes.func,
  }

  static defaultProps = {
    onPressRow: function() {},
    onEndReached: function() {}
  }

  constructor(props) {
    super(props);
    this._onPressRow = this._onPressRow.bind(this);
  }

  _onPressRow(contact) {
    let userId = contact.id;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: UserScene,
        passProps: {userId}
    });
  }

  render() {
    return (
      <ContactList me={this.props.me} onPressRow={this._onPressRow} />
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

export default Relay.createContainer(ContactListView, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        id
        ${ContactList.getFragment('me')},
      }
    `,
  },
});
