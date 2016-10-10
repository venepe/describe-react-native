'use strict';

import Relay from 'react-relay';

export default class DeclineInvitationMutation extends Relay.Mutation {
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
  getMutation() {
    return Relay.QL`mutation{declineInvitation}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeclineInvitationPayload {
        declinedInvitationId,
        me { invitations }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'me',
      parentID: this.props.me.id,
      connectionName: 'invitations',
      deletedIDFieldName: 'declinedInvitationId',
    }];
  }
  getVariables() {
    return {
      id: this.props.invitation.id,
    };
  }
  getOptimisticResponse() {
    return {
      declinedInvitationId: this.props.invitation.id
    };
  }
}
