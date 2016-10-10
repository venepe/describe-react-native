'use strict';

import Relay from 'react-relay';

export default class DidDeleteCollaboratorSubscription extends Relay.Subscription {
  static fragments = {
    collaborator: () => Relay.QL`
      fragment on Collaborator {
        id
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
      }
    `,
  };
  getSubscription() {
    return Relay.QL`
      subscription {
        didDeleteCollaborator (input: $didDeleteCollaborator) {
          deletedCollaboratorId
          project {
            id
          }
        }
      }`;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'project',
      parentID: this.props.project.id,
      connectionName: 'collaborators',
      deletedIDFieldName: 'deletedCollaboratorId',
    }];
  }
  getVariables() {
    return {
      id: this.props.collaborator.id,
      projectId: this.props.project.id,
    };
  }
}
