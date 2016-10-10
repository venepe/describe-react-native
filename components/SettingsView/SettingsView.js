'use strict';

import React, { Component } from 'react';
import { Navigator, PropTypes, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Relay from 'react-relay';
const ReactRedux = require('react-redux');
import NavigationBar from 'react-native-navbar';
import { Common } from '../../styles';
import DefaultButton from '../DefaultButton';
import OutlineButton from '../OutlineButton';
import CloseNavigationButton from '../CloseNavigationButton';
import Authenticate from '../../lib/authenticate';
import SMTINotification from '../../lib/SMTINotification';
import PasswordForm from '../PasswordForm';
import AuthenticatedActions from '../../actions/AuthenticatedActions';
import SettingsNavigationBar from '../SettingsNavigationBar';
import { IntroduceUserCoverMutation } from '../../mutations';

import { CoverImagePickerOptions } from '../../constants/ImagePickerOptions';
import SMTIAnalytics from '../../lib/SMTIAnalytics';
const ImagePickerManager = require('NativeModules').ImagePickerManager;


import { ContactListScene, MeScene, UpdateUserScene } from '../../scenes';

class SettingsView extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func
  }

  static defaultProps = {
    closeDrawer: function() {}
  }

  constructor(props) {
    super(props);
    this._pushViewContacts = this._pushViewContacts.bind(this);
    this._pushViewProfile = this._pushViewProfile.bind(this);
    this._pushUpdateUser = this._pushUpdateUser.bind(this);
    this._changeCoverImage = this._changeCoverImage.bind(this);
    this._pushChangePassword = this._pushChangePassword.bind(this);
    this._didLogoff = this._didLogoff.bind(this);
    this._logOff = this._logOff.bind(this);
    this._startLogOff = this._startLogOff.bind(this);
  }

  _pushViewContacts() {
    let navigator = this.props.navigator;
    let meId = this.props.meId;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.FloatFromRight,
        component: ContactListScene,
        passProps: {navigator, meId}
    })
  }

  _pushViewProfile() {
    let navigator = this.props.navigator;
    let meId = this.props.meId;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.FloatFromRight,
        component: MeScene,
        passProps: {navigator, meId}
    })
  }

  _pushUpdateUser() {
    let navigator = this.props.navigator;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.FloatFromRight,
        component: UpdateUserScene,
        passProps: {navigator, meId: this.props.meId}
    })
  }

  _changeCoverImage() {
    ImagePickerManager.showImagePicker(CoverImagePickerOptions, (response) => {
      if (!response.didCancel) {
        let uri = response.uri.replace('file://', '');
        Relay.Store.commitUpdate(
          new IntroduceUserCoverMutation({uri, user: this.props.me})
        );

        //Start SMTIAnalytics
        SMTIAnalytics.track(SMTIAnalytics.Events.ADDED_COVER_IMAGE);
        //End SMTIAnalytics

      }
    });
  }

  _pushChangePassword() {
    let navigator = this.props.navigator;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.FloatFromRight,
        component: PasswordForm,
        passProps: {navigator}
    })
  }

  _startLogOff() {
    SMTINotification
      .unregister()
      .then(() => {
        this._logOff();
      })
      .catch(() => {
        this._logOff();
      });
  }

  _logOff() {
    Authenticate.logoff()
      .then(() => {
        this._didLogoff();
      })
      .catch((err) => {
        this._didLogoff();
      });
  }

  _didLogoff() {
    this.props.notAuthenticated();
  }

  render() {

    if (this.props.me) {
      return (
        <View style={styles.maxContainer}>
          <SettingsNavigationBar title={this.props.me.name} onPress={this.props.closeDrawer} />
            <TouchableHighlight style={[styles.defaultButton, {marginTop: 10}]} onPress={this._pushViewContacts} activeOpacity={.2} underlayColor={'#CFCFCF'}>
              <Text style={[styles.defaultButtonText]}>View Contacts</Text>
            </TouchableHighlight>
          <TouchableHighlight style={[styles.defaultButton]} onPress={this._pushViewProfile} activeOpacity={.2} underlayColor={'#CFCFCF'}>
            <Text style={[styles.defaultButtonText]}>View Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.defaultButton]} onPress={this._pushUpdateUser} activeOpacity={.2} underlayColor={'#CFCFCF'}>
            <Text style={[styles.defaultButtonText]}>Edit Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.defaultButton]} onPress={this._changeCoverImage} activeOpacity={.2} underlayColor={'#CFCFCF'}>
            <Text style={[styles.defaultButtonText]}>Change Cover Image</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.defaultButton]} onPress={this._pushChangePassword} activeOpacity={.2} underlayColor={'#CFCFCF'}>
            <Text style={[styles.defaultButtonText]}>Change Password</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.defaultButton]} onPress={this._startLogOff} activeOpacity={.2} underlayColor={'#CFCFCF'}>
            <Text style={[styles.defaultButtonText]}>Sign Out</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View style={styles.maxContainer}>
          <NavigationBar title={{title: 'Settings', tintColor: '#373e4d'}} leftButton={<CloseNavigationButton side={'left'} onPress={this.props.closeDrawer}/>} />
          <TouchableHighlight style={[styles.defaultButton]} onPress={this._startLogOff} activeOpacity={.2} underlayColor={'#CFCFCF'}>
            <Text style={[styles.defaultButtonText]}>Sign Out</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    meId: state.meId
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    notAuthenticated: () => dispatch(AuthenticatedActions.notAuthenticated())
  };
}

const SettingsViewRelay = Relay.createContainer(SettingsView, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        id
        name
        ${IntroduceUserCoverMutation.getFragment('user')},
      }
    `,
  },
});

const SettingsViewRedux = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsViewRelay);

const styles = StyleSheet.create({
  maxContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#F9F9F9',
  },
  defaultButton: {
    height: 36,
    marginBottom: 10,
    padding: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  defaultButtonText: {
    fontSize: 18,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#000000'
  },
});

export default SettingsViewRedux;
