'use strict';

import Relay from 'react-relay';

export default class DeleteInviteeMutation extends Relay.Mutation {
  static fragments = {
    invitee: () => Relay.QL`
      fragment on Invitee {
        id
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{deleteInvitee}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteInviteePayload {
        deletedInviteeId
        project {
          id
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'project',
      parentID: this.props.project.id,
      connectionName: 'invitees',
      deletedIDFieldName: 'deletedInviteeId',
    }
  ];
  }
  getVariables() {
    return {
      id: this.props.invitee.id,
      projectId: this.props.project.id
    };
  }
  getOptimisticResponse() {
    return {
      deletedInviteeId: this.props.invitee.id,
      project: {
        id: this.props.project.id
      }
    };
  }
}
