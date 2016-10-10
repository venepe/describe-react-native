'use strict';

import Relay from 'react-relay';

export default class DidIntroduceContactSubscription extends Relay.Subscription {
  static fragments = {
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };
  getSubscription() {
    return Relay.QL`
      subscription {
        didIntroduceContact (input: $didIntroduceContact) {
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
      }`;
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
    };
  }
}
