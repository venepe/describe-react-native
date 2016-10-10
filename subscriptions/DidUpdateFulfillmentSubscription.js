'use strict';

import Relay from 'react-relay';

export default class DidUpdateFulfillmentSubscription extends Relay.Subscription {
  static fragments = {
    fulfillment: () => Relay.QL`
      fragment on Fulfillment {
        id
      }
    `,
    testCase: () => Relay.QL`
      fragment on TestCase {
        id
      }
    `,
  };
  getSubscription() {
    return Relay.QL`
      subscription {
        didUpdateFulfillment (input: $didUpdateFulfillment) {
          fulfillment {
            id
            status
            uri
          }
          fulfillmentEventEdge {
            node {
              id
              status
              uri
              createdAt
              author {
                id
                name
              }
            }
          }
          testCase {
            id
            status
          }
          project {
            id
            numOfTestCasesFulfilled
          }
        }
      }`;
  }
  getConfigs() {
    return [{
        type: 'RANGE_ADD',
        parentName: 'fulfillment',
        parentID: this.props.fulfillment.id,
        connectionName: 'events',
        edgeName: 'fulfillmentEventEdge',
        rangeBehaviors: {
          '': 'prepend',
        }
      }];
  }
  getVariables() {
    return {
      id: this.props.fulfillment.id,
      testCaseId: this.props.testCase.id
    };
  }
}
