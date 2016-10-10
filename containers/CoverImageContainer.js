'use strict';

import React, { Component, PropTypes } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import CoverImageView from '../components/CoverImageView';
import PlaceholderView from '../components/PlaceholderView';
import RelayView from '../components/RelayView';
import { CoverImageRoute } from '../routes';

export default class CoverImageContainer extends RelayView {
  static propTypes = {
    coverImageId: PropTypes.string,
    userId: PropTypes.string,
  }

  static defaultProps = {
    coverImageId: '',
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

    let coverImageId = this.props.coverImageId;
    let userId = this.props.userId;
    let navigator = this.props.navigator;
    let coverImageRoute = new CoverImageRoute({coverImageId, userId});
    return (
       <Relay.RootContainer Component={CoverImageView} route={coverImageRoute} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <CoverImageView {...data} navigator={navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
