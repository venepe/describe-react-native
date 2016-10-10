'use strict';

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import UserNavigationBar from '../components/UserNavigationBar';
import { UserRoute } from '../routes';

export default class UserNavigationBarContainer extends Component {
  static propTypes = {
    userId: PropTypes.string,
  }

  static defaultProps = {
    userId: '',
  }

  constructor(props) {
    super(props);
  }

  render() {

    let userId = this.props.userId;
    let userRoute = new UserRoute({userId});

    return (
       <Relay.RootContainer Component={UserNavigationBar} route={userRoute} renderFetched={data => <UserNavigationBar {...data} navigator={this.props.navigator} /> } />
    );
  }
}
