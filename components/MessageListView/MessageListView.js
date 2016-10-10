'use strict';

import React, { Component } from 'react';
import { Platform, Dimensions, Navigator } from 'react-native';
import Relay from 'react-relay';
import GiftedMessenger from 'react-native-gifted-messenger';
import { UserScene } from '../../scenes';
import SMTIAnalytics from '../../lib/SMTIAnalytics';

import { IntroduceMessageMutation, ReadChannelMutation } from '../../mutations';
import { registerDidIntroduceMessage } from '../../stores/SubscriptionStore';
import { DidIntroduceMessageSubscription } from '../../subscriptions';


let STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
if (Platform.OS === 'android') {
  const ExtraDimensions = require('react-native-extra-dimensions-android');
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
}

const _first = 20;
const _next = 20;

class MessageListView extends Component {

  constructor(props) {
    super(props);
    this._getInitialState = this._getInitialState.bind(this);
    this._getUpdatedState = this._getUpdatedState.bind(this);
    this.onImagePress = this.onImagePress.bind(this);

    this.state = this._getInitialState();

  }

  _getInitialState() {
    let messages = this.props.channel.messages.edges.map(function (object, index) {
      let message = object.node;

      return {
        uniqueId: message.id,
        text: message.text,
        position: 'left',
        image: {
          uri: message.author.cover.uri
        },
        date: new Date(message.createdAt),
        name: message.author.name,
        authorId: message.author.id,
      };

    }.bind(this)).reverse();

     let hasNextPage = this.props.channel.messages.pageInfo.hasNextPage;

     return {
       isLoadingEarlierMessages: false,
       hasNextPage,
       messages,
     };
  }

  _getUpdatedState(channel) {
    let messages = channel.messages.edges.map(function (object, index) {
      let message = object.node;

      return {
        uniqueId: message.id,
        text: message.text,
        position: 'left',
        image: {
          uri: message.author.cover.uri
        },
        date: new Date(message.createdAt),
        name: message.author.name
      };

     }.bind(this)).reverse();

     let hasNextPage = this.props.channel.messages.pageInfo.hasNextPage;

     return {
       isLoadingEarlierMessages: false,
       hasNextPage,
       messages,
     };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.channel) {
      this.setState(this._getUpdatedState(nextProps.channel));
    }
  }

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    this.didReadChannel();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  didReadChannel() {
    Relay.Store.commitUpdate(
      new ReadChannelMutation({channel: this.props.channel})
    );
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

  handleSend(message = {}) {
    // Your logic here
    // Send message.text to your server
    Relay.Store.commitUpdate(
      new IntroduceMessageMutation({text: message.text, channel: this.props.channel})
    );

    //Start SMTIAnalytics
    SMTIAnalytics.track(SMTIAnalytics.Events.ADDED_MESSAGE);
    //End SMTIAnalytics
  }

  onLoadEarlierMessages() {
    let edges = this.props.channel.messages.edges;
    if (edges.length > 0) {
      let cursor = edges[edges.length - 1].cursor;
      let first = this.props.relay.variables.first;
      this.props.relay.setVariables({
        first: first + _next,
        after: cursor
      });
    }
  }

  handleReceive(message = {}) {

  }

  onErrorButtonPress(message = {}) {
  }

  // will be triggered when the Image of a row is touched
  onImagePress(message = {}) {
    let userId = message.authorId;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: UserScene,
        passProps: {userId}
    });
  }

  render() {
    return (
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}

        styles={{
          bubbleLeft: {
            marginRight: 10,
            backgroundColor: '#f5f5f5',
            alignSelf: 'flex-start',
          },
          text: {
            color: '#212121',
            fontSize: 16,
            fontWeight: '400',
            fontFamily: 'Roboto',
          },
          loadEarlierMessagesButton: {
            color: '#ff4081',
            fontSize: 14,
            fontWeight: '400',
            fontFamily: 'Roboto',
          },
          nameInsideBubble: {
            color: '#9e9e9e',
            fontSize: 12,
            marginLeft: 0,
            marginBottom: 5,
            fontWeight: '500',
            fontFamily: 'Roboto',
          },
          sendButton: {
            marginTop: 11,
            marginLeft: 10,
            color: '#ff4081',
            fontSize: 18,
            fontWeight: '400',
            fontFamily: 'Roboto-Bold',
          },
          sendButtonDisabled: {
            color: '#9e9e9e',
          }
        }}

        autoFocus={false}
        placeholder={'Message'}
        messages={this.state.messages}
        displayNamesInsideBubble={true}
        handleSend={this.handleSend.bind(this)}
        onErrorButtonPress={this.onErrorButtonPress.bind(this)}
        maxHeight={Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT}

        loadEarlierMessagesButton={this.state.hasNextPage}
        onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}

        senderImage={null}
        onImagePress={this.onImagePress}
        displayNames={true}

        parseText={false}

        isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}

        typingMessage={this.state.typingMessage}
      />
    );
  }

}

export default Relay.createContainer(MessageListView, {
  initialVariables: {
    first: _first,
    after: null,
    moreFirst: _first
  },
  fragments: {
    channel: () => Relay.QL`
      fragment on Channel {
        id
        messages(first: $first) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              text
              createdAt
              author {
                id
                name
                cover {
                  id
                  uri
                }
              }
            }
          }
        }
        moreMessages: messages(first: $moreFirst, after: $after) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              text
              createdAt
              author {
                id
                name
                cover {
                  id
                  uri
                }
              }
            }
          }
        }
        ${IntroduceMessageMutation.getFragment('channel')},
        ${ReadChannelMutation.getFragment('channel')},
        ${DidIntroduceMessageSubscription.getFragment('channel')},
      }
    `
  },
});
