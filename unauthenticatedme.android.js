'use strict';

import React, { Component } from 'react';
import { BackAndroid, Navigator, View } from 'react-native';
import Relay from 'react-relay';
import { Common } from './styles';
import UnauthenticatedMe from './components/UnauthenticatedMe';

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class Me extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    _navigator = navigator;
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
