'use strict';

import React, { Component, PropTypes } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import UserView from '../components/UserView';
import PlaceholderView from '../components/PlaceholderView';
import RelayView from '../components/RelayView';
import { UserRoute } from '../routes';

export default class UserContainer extends RelayView {
  static propTypes = {
    userId: PropTypes.string,
  }

  static defaultProps = {
    userId: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      renderPlaceholderOnly: true
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholderOnly: false
      })
    });
  }

  render() {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    let userId = this.props.userId;
    let navigator = this.props.navigator;
    var userRoute = new UserRoute({userId});
    return (
       <Relay.RootContainer Component={UserView} route={userRoute} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <UserView {...data} navigator={navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
