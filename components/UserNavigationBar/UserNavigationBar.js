'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import SMTINavigationBar from '../SMTINavigationBar';

class UserNavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SMTINavigationBar title={this.props.user.name} navigator={this.props.navigator} />
    );
  }
}

export default Relay.createContainer(UserNavigationBar, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        name
      }
    `,
  },
});
