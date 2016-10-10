'use strict';

import Relay from 'react-relay';

export default class DidIntroduceInvitationSubscription extends Relay.Subscription {
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
        didIntroduceInvitation (input: $didIntroduceInvitation) {
          invitationEdge {
            node {
              id
              project {
                id
                text
                numOfTestCases
                numOfTestCasesFulfilled
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
              sponsor {
                id
                name
                cover {
                  id
                  uri
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
      connectionName: 'invitations',
      edgeName: 'invitationEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
  getVariables() {
    return {
      meId: this.props.me.id,
    };
  }
}
