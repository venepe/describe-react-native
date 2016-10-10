'use strict';

import Relay from 'react-relay';

export default class DidDeclineInvitationSubscription extends Relay.Subscription {
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
  getSubscription() {
    return Relay.QL`
      subscription {
        didDeclineInvitation (input: $didDeclineInvitation) {
          declinedInvitationId,
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
      connectionName: 'invitations',
      deletedIDFieldName: 'declinedInvitationId',
      }];
  }
  getVariables() {
    return {
      id: this.props.invitation.id,
      meId: this.props.me.id,
    };
  }
}
