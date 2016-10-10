'use strict';

import Relay from 'react-relay';

export default class CoverImageRoute extends Relay.Route {
  static queries = {
    coverImage: (Component) => Relay.QL`
      query {
        node(id: $coverImageId) {
          ${Component.getFragment('coverImage')},
        },
      }
    `,
    user: (Component) => Relay.QL`
      query {
        node(id: $userId) {
          ${Component.getFragment('user')},
        },
      }
    `,
  };

  static paramDefinitions = {
    coverImageId: {required: true},
  }

  static routeName = 'CoverImageRoute';
}
