'use strict';

import Relay from 'react-relay';

export default class DidUpdateProjectSubscription extends Relay.Subscription {
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
        didUpdateProject (input: $didUpdateProject) {
          project {
            id
            text
            numOfTestCases
            numOfTestCasesFulfilled
          }
          projectEventEdge {
            node {
              id
              text
              createdAt
              author {
                id
                name
              }
            }
          }
        }
      }`;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'project',
      parentID: this.props.project.id,
      connectionName: 'events',
      edgeName: 'projectEventEdge',
      rangeBehaviors: {
        '': 'append',
      }
    }];
  }
  getVariables() {
    return {
      id: this.props.project.id,
    };
  }
}
