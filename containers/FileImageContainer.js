'use strict';

import React, { Component, PropTypes } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import FileImageView from '../components/FileImageView';
import PlaceholderView from '../components/PlaceholderView';
import RelayView from '../components/RelayView';
import { FileRoute } from '../routes';

export default class FileImageContainer extends RelayView {
  static propTypes = {
    fileId: PropTypes.string,
  }

  static defaultProps = {
    fileId: '',
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

    let fileId = this.props.fileId;
    let navigator = this.props.navigator;
    let fileRoute = new FileRoute({fileId});
    return (
       <Relay.RootContainer Component={FileImageView} route={fileRoute} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <FileImageView {...data} navigator={navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
