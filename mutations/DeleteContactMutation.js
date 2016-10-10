'use strict';

import Relay from 'react-relay';

export default class DeleteContactMutation extends Relay.Mutation {
  static fragments = {
    contact: () => Relay.QL`
      fragment on User {
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
    return Relay.QL`mutation{deleteContact}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteContactPayload {
        deletedContactId
        me {
          id
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'me',
      parentID: this.props.me.id,
      connectionName: 'contacts',
      deletedIDFieldName: 'deletedContactId',
    }
  ];
  }
  getVariables() {
    return {
      id: this.props.contact.id
    };
  }
  getOptimisticResponse() {
    return {
      deletedContactId: this.props.contact.id,
      me: {
        id: this.props.me.id
      }
    };
  }
}
