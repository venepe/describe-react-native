'use strict';

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import Relay from 'react-relay';
import ContactFormView from '../components/ContactFormView';
import PlaceholderView from '../components/PlaceholderView';
import { MeRoute } from '../routes';

export default class CreateContactScene extends Component {
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

    var meRoute = new MeRoute({meId: this.props.route.passProps.meId});
    return (
       <Relay.RootContainer Component={ContactFormView} route={meRoute} renderFetched={data => <ContactFormView {...data} navigator={this.props.navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}
