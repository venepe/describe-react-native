'use strict';

import Relay from 'react-relay';

export default class LeaveProjectMutation extends Relay.Mutation {
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
    return Relay.QL`mutation{leaveProject}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on LeaveProjectPayload {
        leftProjectId,
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
      deletedIDFieldName: 'leftProjectId',
    }];
  }
  getVariables() {
    return {
      id: this.props.project.id,
    };
  }
  getOptimisticResponse() {
    return {
      leftProjectId: this.props.project.id
    };
  }
}
