'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
const ReactRedux = require('react-redux');
const validator = require('validator');
import SMTINavigationBar from '../SMTINavigationBar';
import CloseNavigationButton from '../CloseNavigationButton';
import InputView from '../InputView';
import SpinnerButton from '../SpinnerButton';
import Authenticate from '../../lib/authenticate';
import { isValidPassword } from '../../lib/utilities';
import AuthenticatedActions from '../../actions/AuthenticatedActions';
import { Common } from '../../styles';
import SMTIAnalytics from '../../lib/SMTIAnalytics';
const serverErrorMsg = 'Invalid email or password. Please try again';
const emailErrorMsg = 'Please enter a valid email address.';
const passwordErrorMsg = 'Password must be at least 6 characters long.';
const btnDisabledColor = '#FCE4EC';
const btnEnabledColor = '#FF4081';

class RegisterForm extends InputView {
  constructor(props) {
    super(props);
    this._onChangeEmail = this._onChangeEmail.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
    this._onRegister = this._onRegister.bind(this);

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
    let errorMessage = this.state.errorMessage;
    if (validator.isEmail(email)) {
      isEmailValid = true;
      if (errorMessage === emailErrorMsg) {
        errorMessage = '';
      }
    }

    this.setState({
      email,
      isEmailValid,
      errorMessage
    });
  }

  _onChangePassword(password) {
    let isPasswordValid = false;
    let errorMessage = this.state.errorMessage;
    if (isValidPassword(password)) {
      isPasswordValid = true;
      if (errorMessage === passwordErrorMsg) {
        errorMessage = '';
      }
    }
    this.setState({
      password,
      isPasswordValid,
      errorMessage
    });
  }

  updateKeyboardSpace(height) {
    this.setState({keyboardSpace: height});
  }

  resetKeyboardSpace() {
    this.setState({keyboardSpace: 0});
  }

  _onRegister() {
    let password = this.state.password;
    let email = this.state.email.trim();
    if (!validator.isEmail(email)) {
      this.setState({
        errorMessage: emailErrorMsg
      });
    } else if (!isValidPassword(password)) {
      this.setState({
        errorMessage: passwordErrorMsg
      });
    } else if(!this.state.isLoading) {
      this.setState({isLoading: true});
      Authenticate.register(email, password)
        .then((meId) => {
          //Start SMTIAnalytics
          SMTIAnalytics.track(SMTIAnalytics.Events.REGISTERED);
          //End SMTIAnalytics

          this.props.onAuthenticated(meId);
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errorMessage: serverErrorMsg,
            isLoading: false
          });
        });
    }
  }

  render() {
    let buttonBackgroundColor = btnEnabledColor;
    if (this.state.isLoading) {
      buttonBackgroundColor = btnDisabledColor;
    }

    return (
      <View style={{flex: 1}}>
        <SMTINavigationBar title='Sign Up' leftButton={<CloseNavigationButton navigator={this.props.navigator} side={'left'}/>} />
        <ScrollView backgroundColor={'#FFFFFF'} contentContainerStyle={styles.maxContainer} keyboardShouldPersistTaps={false}>
          <View style={styles.maxContainer}>
            <View style={[styles.container, {flex: .20}]}>
          </View>
            <View style={[styles.container, {flex: .80, margin: 20}]}>
              <TextInput style={[styles.textbox, {margin: 5}]} placeholder={'Email'} onChangeText={this._onChangeEmail}
                value={this.state.email} autoFocus={false} keyboardType={'email-address'} returnKeyType={'done'} maxLength={150} autoCapitalize={'none'}/>
              <View style={{borderWidth: 1, borderColor: 'transparent', borderBottomColor: '#DCDCDC', margin: 5}}></View>
              <TextInput style={[styles.textbox, {margin: 5, marginBottom: 10}]} placeholder={'Password'} onChangeText={this._onChangePassword}
                password={true} value={this.state.password} returnKeyType={'done'} maxLength={32}/>
              <SpinnerButton showSpinner={this.state.isLoading} title="Sign up" backgroundColor={buttonBackgroundColor} underlayColor={btnDisabledColor} onPress={this._onRegister} />
              <View style={styles.centerTextContainer}><Text style={Common.warningText}>{this.state.errorMessage}</Text></View>
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

const RegisterFormRedux = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);

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
  centerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  textbox: {
    height: 36, // 36
    fontSize: 17, // 25
    color: '#000000',
    fontWeight: '300', //500
    fontFamily: 'Roboto',
  },
});

export default RegisterFormRedux;
