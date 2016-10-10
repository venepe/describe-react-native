'use strict';

import Relay from 'react-relay';

export default class DeleteUserMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation{deleteUser}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteUserPayload {
        deletedUserId
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: null,
      parentID: null,
      connectionName: null,
      deletedIDFieldName: 'deletedUserId',
    }];
  }
  getVariables() {
    return {
      id: this.props.user.id,
    };
  }
  getOptimisticResponse() {
    return {
      deletedUserId: this.props.user.id
    };
  }
}
