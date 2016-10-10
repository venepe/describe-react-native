'use strict';

import Relay from 'react-relay';

export default class IntroduceUserCoverMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{introduceUserCover}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on IntroduceUserCoverPayload {
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

  getFiles() {
    return [
      this.props.uri
    ]
  }

  getVariables() {
    return {
      userId: this.props.user.id,
      uri: this.props.uri
    };
  }

  getOptimisticResponse() {
    return {
      user: {
        cover: {},
      }
    };
  }
}
