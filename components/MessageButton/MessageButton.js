'use strict';

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const Icon = require('react-native-vector-icons/MaterialIcons');

import { registerDidIntroduceMessage } from '../../stores/SubscriptionStore';
import { DidIntroduceMessageSubscription } from '../../subscriptions';

class MessageButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  static defaultProps = {
    onPress: function() {}
  }

  constructor(props) {
    super(props);
    this.renderNumOfMessagesUnread = this.renderNumOfMessagesUnread.bind(this);
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  subscribe() {
    if (this.props.channel) {
      let channel = this.props.channel;
      let channelId = channel.id;

      registerDidIntroduceMessage({channelId}, () => {
        return Relay.Store.subscribe(
          new DidIntroduceMessageSubscription({channel})
        );
      });
    }
  }

  renderNumOfMessagesUnread() {
    if (this.props.channel.numOfMessagesUnread > 0) {
      return (
        <Text style={styles.label}>{this.props.channel.numOfMessagesUnread}</Text>
      );
    }
  }

  render() {

    return (
      <TouchableOpacity onPress={this.props.onPress} style={[this.props.style, styles.container]}>
        <Icon name='chat-bubble' size={30} style={styles.icon}>
        </Icon>
        {this.renderNumOfMessagesUnread()}
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
    marginLeft: 5,
    color: '#616161',
    backgroundColor: 'transparent',
  },
  label: {
    position: 'absolute',
    right: 10,
    top: 8,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto'
  },
});

export default Relay.createContainer(MessageButton, {
  fragments: {
    channel: () => Relay.QL`
      fragment on Channel {
        id
        numOfMessagesUnread
        ${DidIntroduceMessageSubscription.getFragment('channel')},
      }
    `
  },
});
