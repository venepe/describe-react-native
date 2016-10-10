'use strict';

import Relay from 'react-relay';

export default class DidAcceptInvitationSubscription extends Relay.Subscription {
  static fragments = {
    invitation: () => Relay.QL`
      fragment on Invitation {
        id
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };
  getSubscription() {
    return Relay.QL`
      subscription {
        didAcceptInvitation (input: $didAcceptInvitation) {
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
          },
          acceptedInvitationId,
          me {
            id
          },
        }
      }`;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'me',
      parentID: this.props.me.id,
      connectionName: 'invitations',
      deletedIDFieldName: 'acceptedInvitationId',
      }];
  }
  getVariables() {
    return {
      id: this.props.invitation.id,
      meId: this.props.me.id,
    };
  }
}
