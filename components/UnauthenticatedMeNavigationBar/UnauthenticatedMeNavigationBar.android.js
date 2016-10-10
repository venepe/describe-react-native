'use strict';

import React, { Component, PropTypes } from 'react';
import { ToolbarAndroid } from 'react-native';

class UnauthenticatedMeNavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ToolbarAndroid title='Describe' titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}}/>
    );
  }
}

export default UnauthenticatedMeNavigationBar;
