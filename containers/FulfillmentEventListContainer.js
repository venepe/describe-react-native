'use strict';

import React, { Component, PropTypes } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import FulfillmentEventListView from '../components/FulfillmentEventListView';
import PlaceholderView from '../components/PlaceholderView';
import RelayView from '../components/RelayView';
import { FulfillmentRoute } from '../routes';
import { applyForceFetch } from '../stores/ForceFetchStore';

export default class FulfillmentEventListContainer extends RelayView {
  static propTypes = {
    testCaseId: PropTypes.string,
    projectId: PropTypes.string,
  }

  static defaultProps = {
    testCaseId: '',
    projectId: '',
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

    let fulfillmentId = this.props.fulfillmentId;
    let projectId = this.props.projectId;
    let testCaseId = this.props.testCaseId;
    let navigator = this.props.navigator;
    let fulfillmentRoute = new FulfillmentRoute({fulfillmentId, projectId, testCaseId});
    let forceFetch = applyForceFetch(fulfillmentId);

    return (
       <Relay.RootContainer Component={FulfillmentEventListView} route={fulfillmentRoute} forceFetch={forceFetch} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <FulfillmentEventListView {...data} navigator={navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
