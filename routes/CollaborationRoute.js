'use strict';

import Relay from 'react-relay';

export default class CollaborationRoute extends Relay.Route {
  static queries = {
    collaboration: (Component) => Relay.QL`
      query {
        node(id: $collaborationId) {
          ${Component.getFragment('collaboration')},
        },
      }
    `,
    me: (Component) => Relay.QL`
      query {
        node(id: $meId) {
          ${Component.getFragment('me')},
        },
      }
    `,
  };

  static paramDefinitions = {
    collaborationId: {required: true},
  }

  static routeName = 'CollaborationRoute';
}
