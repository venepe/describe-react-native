'use strict';

import React, { Component, PropTypes } from 'react';
import NavigationBar from 'react-native-navbar';

class UnauthenticatedMeNavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationBar title={{title: 'Describe', tintColor: '#373e4d'}}/>
    );
  }
}

export default UnauthenticatedMeNavigationBar;
