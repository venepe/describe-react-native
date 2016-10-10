'use strict';

import Relay from 'react-relay';

export default class DidIntroduceMessageSubscription extends Relay.Subscription {
  static fragments = {
    channel: () => Relay.QL`
      fragment on Channel {
        id
      }
    `,
  };
  getSubscription() {
    return Relay.QL`
      subscription {
        didIntroduceMessage (input: $didIntroduceMessage) {
          messageEdge {
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
          channel {
            id
            numOfMessagesUnread
          }
        }
      }`;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'channel',
      parentID: this.props.channel.id,
      connectionName: 'messages',
      edgeName: 'messageEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    }];
  }
  getVariables() {
    return {
      channelId: this.props.channel.id,
    };
  }
}
