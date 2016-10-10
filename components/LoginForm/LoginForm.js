'use strict';

import React, { Component, PropTypes } from 'react';
import { DeviceEventEmitter, Navigator, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
const ReactRedux = require('react-redux');
const validator = require('validator');
import SMTINavigationBar from '../SMTINavigationBar';
import CloseNavigationButton from '../CloseNavigationButton';
import ForgotForm from '../ForgotForm';
import InputView from '../InputView';
import SpinnerButton from '../SpinnerButton';
import TouchableText from '../TouchableText';
import Authenticate from '../../lib/authenticate';
import { isValidPassword } from '../../lib/utilities';
import SMTIAnalytics from '../../lib/SMTIAnalytics';
import SMTINotification from '../../lib/SMTINotification';
import AuthenticatedActions from '../../actions/AuthenticatedActions';
import { Common } from '../../styles';
const errorMessage = 'Invalid email or password. Please try again';
const btnDisabledColor = '#FCE4EC';
const btnEnabledColor = '#FF4081';

class LoginForm extends InputView {
  constructor(props) {
    super(props);
    this._onChangeEmail = this._onChangeEmail.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
    this._onLogin = this._onLogin.bind(this);
    this._pushForgot = this._pushForgot.bind(this);

    this.state = {
      email: '',
      password: '',
      keyboardSpace: 0,
      errorMessage: '',
      isEmailValid: false,
      isPasswordValid: false,
      isLoading: false
    }
  }

  _onChangeEmail(email) {
    let isEmailValid = false;
    if (validator.isEmail(email)) {
      isEmailValid = true;
    }

    this.setState({
      email,
      isEmailValid
    });
  }

  _onChangePassword(password) {
    let isPasswordValid = false;
    if (isValidPassword(password)) {
      isPasswordValid = true;
    }
    this.setState({
      password,
      isPasswordValid
    });
  }

  updateKeyboardSpace(height) {
    this.setState({keyboardSpace: height});
  }

  resetKeyboardSpace() {
    this.setState({keyboardSpace: 0});
  }

  _onLogin() {
    let password = this.state.password;
    let email = this.state.email.trim();
    if (this.state.isEmailValid && this.state.isPasswordValid && !this.state.isLoading) {
      this.setState({isLoading: true});
      Authenticate.login(email, password)
        .then((meId) => {
          //Start SMTIAnalytics
          SMTIAnalytics.track(SMTIAnalytics.Events.SIGNED_IN);
          //End SMTIAnalytics

          this.props.onAuthenticated(meId);
        })
        .catch((err) => {
          this.setState({
            errorMessage: errorMessage,
            isLoading: false
          });
        })
    }
  }

  _pushForgot() {
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        component: ForgotForm,
        passProps: {}
    })
  }

  render() {

    let buttonBackgroundColor = btnDisabledColor;
    if (this.state.isEmailValid && this.state.isPasswordValid && !this.state.isLoading) {
      buttonBackgroundColor = btnEnabledColor;
    }

    return (
      <View style={{flex: 1}}>
        <SMTINavigationBar title='Log In' leftButton={<CloseNavigationButton navigator={this.props.navigator} side={'left'}/>}/>
        <ScrollView backgroundColor={'#FFFFFF'} contentContainerStyle={styles.maxContainer} keyboardShouldPersistTaps={false}>
          <View style={styles.maxContainer}>
            <View style={[styles.container, {flex: .20}]}>
          </View>
            <View style={[styles.container, {flex: .80, margin: 20}]}>
              <TextInput style={[styles.textbox, {margin: 5}]} placeholder={'Email'} onChangeText={this._onChangeEmail}
                value={this.state.email} autoFocus={false} keyboardType={'email-address'} returnKeyType={'done'} maxLength={150} autoCapitalize={'none'}/>
              <View style={styles.borderLine}></View>
              <TextInput style={[styles.textbox, {margin: 5, marginBottom: 10}]} placeholder={'Password'} onChangeText={this._onChangePassword}
                password={true} value={this.state.password} returnKeyType={'done'} maxLength={32}/>
              <SpinnerButton showSpinner={this.state.isLoading} title="Log in" backgroundColor={buttonBackgroundColor} underlayColor={btnDisabledColor} onPress={this._onLogin} />
              <View style={styles.centerTextContainer}><Text style={Common.warningText}>{this.state.errorMessage}</Text></View>
              <View style={styles.centerTextContainer}><TouchableText text='Forgot Your Password?' style={styles.forgotText} onPress={this._pushForgot}/></View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {};
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onAuthenticated: (meId) => dispatch(AuthenticatedActions.authenticated(meId))
  };
}

const LoginFormRedux = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

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
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  centerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbox: {
    height: 36, // 36
    fontSize: 17, // 25
    color: '#000000',
    fontWeight: '300', //500
    fontFamily: 'Roboto',
  },
  borderLine: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#DCDCDC',
    margin: 5,
  },
  forgotText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto-Bold'
  },
});

export default LoginFormRedux;
