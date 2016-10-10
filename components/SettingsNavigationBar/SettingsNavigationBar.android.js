'use strict';

import React, { Component, PropTypes } from 'react';
import { ToolbarAndroid } from 'react-native';
import Relay from 'react-relay';
import CollaboratorListNavigationBar from '../CollaboratorListNavigationBar';
import { UpdateUserScene } from '../../scenes';

class SettingsNavigationBar extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string
  }

  static defaultProps = {
    onPress: function() {},
    title: ''
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ToolbarAndroid title={this.props.title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[]} onActionSelected={() => this.props.onPress}/>
    );
  }
}

export default SettingsNavigationBar;
