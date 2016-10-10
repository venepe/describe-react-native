'use strict';

import Relay from 'react-relay';

export default class FileRoute extends Relay.Route {
  static queries = {
    file: (Component) => Relay.QL`
      query {
        node(id: $fileId) {
          ${Component.getFragment('file')},
        },
      }
    `,
  };

  static paramDefinitions = {
    fileId: {required: true},
  }

  static routeName = 'FileRoute';
}
