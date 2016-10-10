'use strict';

import Relay from 'react-relay';

export default class MeRoute extends Relay.Route {
  static queries = {
    me: (Component) => Relay.QL`
      query {
        node(id: $meId) {
          ${Component.getFragment('me')},
        },
      }
    `,
  };

  static paramDefinitions = {
    meId: {required: true},
  }

  static routeName = 'MeRoute';
}
