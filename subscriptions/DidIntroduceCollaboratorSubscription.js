'use strict';

import Relay from 'react-relay';

export default class DidIntroduceCollaboratorSubscription extends Relay.Subscription {
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
        didIntroduceCollaborator (input: $didIntroduceCollaborator) {
          collaboratorEdge {
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
        connectionName: 'collaborators',
        edgeName: 'collaboratorEdge',
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
