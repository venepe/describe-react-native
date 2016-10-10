'use strict';

import Relay from 'react-relay';

export default class DidIntroduceProjectSubscription extends Relay.Subscription {
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
        didIntroduceProject (input: $didIntroduceProject) {
          projectEdge {
            node {
              id
              text
              numOfTestCases
              numOfTestCasesFulfilled
              permission
              testCases(first: 1) {
                edges {
                  node {
                    id
                    text
                  }
                }
              }
              collaborators(first: 5) {
                edges {
                  node {
                    id
                    role
                    profile {
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
      connectionName: 'projects',
      edgeName: 'projectEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    }];
  }
  getVariables() {
    return {
      meId: this.props.me.id,
    };
  }
}
