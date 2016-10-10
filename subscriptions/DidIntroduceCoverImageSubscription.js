'use strict';

import Relay from 'react-relay';

export default class DidIntroduceCoverImageSubscription extends Relay.Subscription {
  static fragments = {
    target: () => Relay.QL`
      fragment on Node {
        id
      }
    `,
  };
  getSubscription() {
    return Relay.QL`
      subscription {
        didIntroduceCoverImage (input: $didIntroduceCoverImage) {
          coverImageEdge {
            node {
              id
              uri
            }
          }
          target {
            id
          }
        }
      }`;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'target',
      parentID: this.props.target.id,
      connectionName: 'coverImages',
      edgeName: 'coverImageEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
  getVariables() {
    return {
      targetId: this.props.target.id,
    };
  }
}
