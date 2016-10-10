'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, ToolbarAndroid, TouchableOpacity } from 'react-native';
import Relay from 'react-relay';
import CollaboratorListNavigationBar from '../CollaboratorListNavigationBar';
import { UpdateUserScene } from '../../scenes';

class MeNavigationBar extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    meId: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    projectId: '',
    meId: '',
    title: ''
  }

  constructor(props) {
    super(props);
    this._onActionSelected = this._onActionSelected.bind(this);
  }

  _onActionSelected() {
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: UpdateUserScene,
        passProps: {projectId: this.props.projectId, meId: this.props.meId, navigator: this.props.navigator}
    });
  }

  render() {
    return (
      <ToolbarAndroid title={'Profile'} titleColor='#FFFFFF' style={{backgroundColor: '#607d8b', height: 56,}} actions={[{title: 'Edit Profile', icon: require('image!ic_more_horiz'), show: 'always'}]} onActionSelected={this._onActionSelected}/>
    );
  }
}

export default MeNavigationBar;
