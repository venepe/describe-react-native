'use strict';

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const Icon = require('react-native-vector-icons/MaterialIcons');

class FulfillmentStatusButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  static defaultProps = {
    onPress: function() {}
  }

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <TouchableOpacity onPress={this.props.onPress} style={[this.props.style, styles.container]}>
        <Icon name='photo-camera' size={30} style={[styles.icon]}>
        </Icon>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 5
  },
  icon: {
    width: 30,
    height: 30,
    color: '#616161',
    backgroundColor: 'transparent',
  },
});

export default FulfillmentStatusButton;

// export default Relay.createContainer(FulfillmentStatusButton, {
//   fragments: {
//     channel: () => Relay.QL`
//       fragment on Channel {
//         id
//         numOfMessagesUnread
//         ${DidIntroduceMessageSubscription.getFragment('channel')},
//       }
//     `
//   },
// });
