'use strict';

import Relay from 'react-relay';

export default class DidIntroduceInviteeSubscription extends Relay.Subscription {
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
        didIntroduceInvitee (input: $didIntroduceInvitee) {
          inviteeEdge {
            cursor
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
          project {
            id
          },
        }
      }`;
  }
  getConfigs() {
    return [{
        type: 'RANGE_ADD',
        parentName: 'project',
        parentID: this.props.project.id,
        connectionName: 'invitees',
        edgeName: 'inviteeEdge',
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
