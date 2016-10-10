'use strict';

import React, { Component, PropTypes } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import ContactListView from '../components/ContactListView';
import PlaceholderView from '../components/PlaceholderView';
import RelayView from '../components/RelayView';
import { MeRoute } from '../routes';
import { applyForceFetch } from '../stores/ForceFetchStore';

export default class ContactListContainer extends RelayView {
  static propTypes = {
    meId: PropTypes.string,
  }

  static defaultProps = {
    meId: '',
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

    let meId = this.props.meId;
    let navigator = this.props.navigator;
    let meRoute = new MeRoute({meId});
    let forceFetch = applyForceFetch(meId);

    return (
       <Relay.RootContainer Component={ContactListView} route={meRoute} forceFetch={forceFetch} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <ContactListView {...data} navigator={this.props.navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
