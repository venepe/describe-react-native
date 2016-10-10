'use strict';

import Relay from 'react-relay';

export default class DidIntroduceTestCaseSubscription extends Relay.Subscription {
  static fragments = {
    project: () => Relay.QL`
      fragment on Project {
        id
      }
    `,
  };
  getSubscription() {
    return Relay.QL`
      subscription {
        didIntroduceTestCase (input: $didIntroduceTestCase) {
          testCaseEdge {
            cursor
            node {
              id
              text
              status
              fulfillments(first: 1) {
                edges {
                  node {
                    id
                    uri
                  }
                }
              }
            }
          }
          project {
            numOfTestCases
          },
        }
      }`;
  }
  getConfigs() {
    return [{
        type: 'RANGE_ADD',
        parentName: 'project',
        parentID: this.props.project.id,
        connectionName: 'testCases',
        edgeName: 'testCaseEdge',
        rangeBehaviors: {
          '': 'append',
        }
      }];
  }
  getVariables() {
    return {
      projectId: this.props.project.id,
    };
  }
}
