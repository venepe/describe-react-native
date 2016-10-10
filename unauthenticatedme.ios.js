'use strict';

import React, { Component } from 'react';
import { Navigator, View } from 'react-native';
import Relay from 'react-relay';
import UnauthenticatedMe from './components/UnauthenticatedMe';

class Me extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    var Component = route.component;

    return (
      <View style={{ flex: 1, }}>
        <Component {...route.passProps} navigator={navigator} route={route} />
      </View>
    );
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
        configureScene={(route) => {
         if (route.sceneConfig) {
           return route.sceneConfig;
         }
         return Navigator.SceneConfigs.FloatFromBottom;
       }}
        initialRoute={{
          component: UnauthenticatedMe,
          passProps : {},
        }}
      />
    );
  }
}

module.exports = Me;
