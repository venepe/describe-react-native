'use strict';

import Relay from 'react-relay';

export default class IntroduceContactMutation extends Relay.Mutation {
  static fragments = {
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{introduceContact}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on IntroduceContactPayload {
        contactEdge {
          cursor
          node {
            id
            email
            name
            cover {
              id
              uri
            }
          }
        }
        me {
          id
        },
      }
    `;
  }
  getConfigs() {
    return [{
        type: 'RANGE_ADD',
        parentName: 'me',
        parentID: this.props.me.id,
        connectionName: 'contacts',
        edgeName: 'contactEdge',
        rangeBehaviors: {
          '': 'append',
        }
      }];
  }
  getVariables() {
    return {
      meId: this.props.me.id,
      email: this.props.email,
    };
  }
  getOptimisticResponse() {
    return {
      contactEdge: {
        node: {
          cover:{}
        },
      },
      me: {
        id: this.props.me.id,
      }
    };
  }
}
