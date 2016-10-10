'use strict';

import React, { Component } from 'react';
import { Navigator, StyleSheet, View } from 'react-native';
import { Common } from '../../styles';
import UnauthenticatedMeNavigationBar from '../UnauthenticatedMeNavigationBar';
import DefaultButton from '../DefaultButton';
import LoginForm from '../LoginForm';
import OutlineButton from '../OutlineButton';
import RegisterForm from '../RegisterForm';

class UnauthenticatedMe extends Component {
  constructor(props) {
    super(props);
    this._onPushRegister = this._onPushRegister.bind(this);
    this._onPushLogin = this._onPushLogin.bind(this);
  }

  _onPushRegister() {
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        component: RegisterForm,
        passProps: {}
    })
  }

  _onPushLogin() {
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        component: LoginForm,
        passProps: {}
    })
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <UnauthenticatedMeNavigationBar />
        <View style={styles.maxContainer}>
          <View style={styles.container}>
        </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={{flex: .5, flexDirection: 'column', alignItems: 'stretch', marginLeft: 16, marginRight: 8}}>
                <DefaultButton title='Sign Up' onPress={this._onPushRegister} backgroundColor={'#FF4081'} activeOpacity={.2} underlayColor={'#FCE4EC'} textColor={'#212121'} />
              </View>
              <View style={{flex: .5, flexDirection: 'column', alignItems: 'stretch', marginLeft: 8, marginRight: 16}}>
                <OutlineButton title='Log In' onPress={this._onPushLogin} borderColor={'#FF4081'} textColor={'#212121'} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maxContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: .5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default UnauthenticatedMe;
