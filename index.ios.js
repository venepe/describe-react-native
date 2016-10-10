/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, AppState, View } from 'react-native';
import { initNetwork } from './lib/initNetwork';
import SMTIStorage from './lib/storage';

const Redux = require('redux');
const ReactRedux = require('react-redux');
import AuthenticatedActions from './actions/AuthenticatedActions';
import { AuthenticatedStore, ForceFetchStore } from './stores';

let store = Redux.createStore(AuthenticatedStore);

const Icon = require('react-native-vector-icons/EvilIcons');

const Projects = require('./projects.ios');
const UnauthenticatedMe = require('./unauthenticatedme.ios');

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onAuthenticated: (meId) => dispatch(AuthenticatedActions.authenticated(meId)),
    notAuthenticated: () => dispatch(AuthenticatedActions.notAuthenticated())
  };
}

class SMTIDrawer extends Component {
  constructor(props) {
    super(props);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    var isAuthenticated = false;
    if (props.hasToken) {
      props.onAuthenticated(props.meId);
      isAuthenticated = true;
    } else {
      props.notAuthenticated();
    }
    this.state = {
      currentAppState: AppState.currentState,
      selectedTab: 'project',
      isAuthenticated
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange(currentAppState) {
    if (currentAppState === 'active') {
      ForceFetchStore.resetStore();
      SMTIStorage.getToken()
        .then((token) => {
          if (token) {
            initNetwork(token);
          }
        });
    }
    this.setState({ currentAppState, });
  }

  render() {
    //03FE9D F814CD FBFDD6
    //0D1929 FBFDD6 02FD9C
    if (this.state.isAuthenticated) {
      return (
        <Projects />
      );
    } else {
      return (
        <UnauthenticatedMe />
      )
    }
  }
}

var SMTIDrawerRedux = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(SMTIDrawer);

var Provider = ReactRedux.Provider;

class Describe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: (<View style={{flex: 1}} />)
    }

    SMTIStorage.getTokenAndMeId()
      .then((result) => {
        var token = result[0];
        var meId = result[1];
        var hasToken = (token) ? true : false;
        if (hasToken) {
          initNetwork(token);
          this.setState({
            component: (<SMTIDrawerRedux hasToken={hasToken} meId={meId}/>)
          });
        } else {
          this.setState({
            component: (<SMTIDrawerRedux />)
          });
        }
      })
      .catch((err) => {
        initNetwork();
        this.setState({
          component: (<SMTIDrawerRedux />)
        });
      });

  }

  render() {
    //03FE9D F814CD FBFDD6
    //0D1929
    return (
      <View style={{flex: 1}}>
        <Provider store={store}>
          {this.state.component}
        </Provider>
      </View>
    );
  }
}

AppRegistry.registerComponent('Describe', () => Describe);
