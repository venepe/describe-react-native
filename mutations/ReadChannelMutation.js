'use strict';

import Relay from 'react-relay';

export default class ReadChannelMutation extends Relay.Mutation {
  static fragments = {
    channel: () => Relay.QL`
      fragment on Channel {
        id
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{readChannel}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ReadChannelPayload {
        channel {
          id
          numOfMessagesUnread
        },
      }
    `;
  }
  getConfigs() {
    return [
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
      id: this.props.channel.id,
    };
  }
  getOptimisticResponse() {
    return {
      channel: {
        id: this.props.channel.id,
        numOfMessagesUnread: 0,
      }
    };
  }
}
