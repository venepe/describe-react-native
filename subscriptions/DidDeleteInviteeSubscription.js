'use strict';

import Relay from 'react-relay';

export default class DidDeleteInviteeSubscription extends Relay.Subscription {
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
  getSubscription() {
    return Relay.QL`
      subscription {
        didDeleteInvitee (input: $didDeleteInvitee) {
          deletedInviteeId
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
      connectionName: 'invitees',
      deletedIDFieldName: 'deletedInviteeId',
    }];
  }
  getVariables() {
    return {
      id: this.props.invitee.id,
      projectId: this.props.project.id,
    };
  }
}
