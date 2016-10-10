'use strict';

import Relay from 'react-relay';

export default class UserRoute extends Relay.Route {
  static queries = {
    user: (Component) => Relay.QL`
      query {
        node(id: $userId) {
          ${Component.getFragment('user')},
        },
      }
    `,
  };

  static paramDefinitions = {
    userId: {required: true},
  }

  static routeName = 'UserRoute';
}
