'use strict';

import Relay from 'react-relay';

export default class IntroduceMessageMutation extends Relay.Mutation {
  static fragments = {
    channel: () => Relay.QL`
      fragment on Channel {
        id
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{introduceMessage}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on IntroduceMessagePayload {
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
          messages
        },
      }
    `;
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
    },
    {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        channel: this.props.channel.id,
      },
    }
  ];
  }
  getVariables() {
    return {
      channelId: this.props.channel.id,
      text: this.props.text,
    };
  }
  getOptimisticResponse() {
    return {
      messageEdge: {
        node: {
          text: this.props.text,
          createdAt: Date.now(),
          author: {
            cover: {}
          }
        },
      },
      channel: {
        id: this.props.channel.id,
      }
    };
  }
}
