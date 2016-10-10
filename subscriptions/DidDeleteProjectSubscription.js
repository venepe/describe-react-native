'use strict';

import Relay from 'react-relay';

export default class DidDeleteProjectSubscription extends Relay.Subscription {
  static fragments = {
    project: () => Relay.QL`
      fragment on Project {
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
        didDeleteProject (input: $didDeleteProject) {
          deletedProjectId,
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
      connectionName: 'projects',
      deletedIDFieldName: 'deletedProjectId',
      }];
  }
  getVariables() {
    return {
      id: this.props.project.id,
      meId: this.props.me.id,
    };
  }
}
