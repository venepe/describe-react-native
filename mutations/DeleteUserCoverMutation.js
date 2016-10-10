'use strict';

import Relay from 'react-relay';

export default class DeleteUserCoverMutation extends Relay.Mutation {
  static fragments = {
    coverImage: () => Relay.QL`
      fragment on File {
        id
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{deleteUserCover}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteUserCoverPayload {
        user {
          cover {
            id
            uri
          }
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.coverImage.id,
    };
  }
  getOptimisticResponse() {
    return {
      user: {
        cover: {},
      },
    };
  }
}
