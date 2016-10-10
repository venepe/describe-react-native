'use strict';

import Relay from 'react-relay';

export default class DeleteProjectMutation extends Relay.Mutation {
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
  getMutation() {
    return Relay.QL`mutation{deleteProject}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteProjectPayload {
        deletedProjectId,
        me { projects }
      }
    `;
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
    };
  }
  getOptimisticResponse() {
    return {
      deletedProjectId: this.props.project.id
    };
  }
}
