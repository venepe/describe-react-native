'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, ToolbarAndroid, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import { CreateContactScene } from '../../scenes';

class ContactListNavigationBar extends Component {
  static propTypes = {
    meId: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    meId: '',
    title: '',
  }

  constructor(props) {
    super(props);
    this._onActionSelected = this._onActionSelected.bind(this);
  }

  _onActionSelected() {
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromBottom,
        component: CreateContactScene,
        passProps: {meId: this.props.meId, navigator: this.props.navigator}
    });
  }

  render() {
    return (
      <ToolbarAndroid title={this.props.title} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Add Collaborator', icon: require('image!ic_add'), show: 'always'}]} onActionSelected={this._onActionSelected}/>
    );
  }
}

export default ContactListNavigationBar;
