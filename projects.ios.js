'use strict';

import React, { Component } from 'react';
import { InteractionManager, Navigator, View } from 'react-native';
import Relay from 'react-relay';
const ReactRedux = require('react-redux');
import { Common } from './styles';
const Icon = require('react-native-vector-icons/EvilIcons');
import { MeRoute } from './routes';
import RelayView from './components/RelayView';
import PlaceholderView from './components/PlaceholderView';
import MyCollaborationsNavigationBar from './components/MyCollaborationsNavigationBar';
import MyCollaborationsPlaceholderBar from './components/MyCollaborationsPlaceholderBar';
import MyProjectsView from './components/MyProjectsView';
import ProjectForm from './components/ProjectForm';
import SettingsView from './components/SettingsView';
import PushNotification from 'react-native-push-notification';
import SMTINotification from './lib/SMTINotification';
import DrawerLayout from 'react-native-drawer-layout';

function pushNotification() {
  PushNotification.configure({
    onRegister: function(result) {
      SMTINotification.register(result.token, result.os);
    },
    onNotification: function() {},
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: false,
    requestPermissions: true
  });
}

class CreateProjectRelayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meId: props.meId,
      renderPlaceholderOnly: true
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholderOnly: false
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  render() {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    var meId = this.state.meId;
    var meRoute = new MeRoute({meId});
    return (
       <Relay.RootContainer Component={ProjectForm} route={meRoute} renderFetched={data => <ProjectForm {...data} navigator={this.props.navigator} /> } />
    );
  }

  _renderPlaceholderView() {
    return (
      <PlaceholderView />
    )
  }
}

class ProjectsView extends RelayView {
  constructor(props) {
    super(props);
    this.state = {
      meId: props.meId
    }
  }

  componentDidMount() {
    pushNotification();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  renderPlaceholderBar() {
    return (
      <MyCollaborationsPlaceholderBar meId={this.state.meId} openDrawer={() => this.drawer.openDrawer()} navigator={this.props.navigator} />
    )
  }

  render() {
    var meId = this.state.meId;
    var meRoute = new MeRoute({meId});
    return (
      <DrawerLayout
        drawerWidth={300}
        drawerLockMode={'unlocked'}
        ref={(drawer) => { return this.drawer = drawer  }}
        keyboardDismissMode='on-drag'
        renderNavigationView={() => (<Relay.RootContainer Component={SettingsView} route={meRoute} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <SettingsView {...data} navigator={this.props.navigator} closeDrawer={() => this.drawer.closeDrawer()} /> } />)}>
        <View style={Common.maxContainer}>
          <Relay.RootContainer Component={MyCollaborationsNavigationBar} route={meRoute} renderLoading={() => this.renderPlaceholderBar()} renderFailure={() => this.renderPlaceholderBar()} renderFetched={data => <MyCollaborationsNavigationBar {...data} openDrawer={() => this.drawer.openDrawer()} navigator={this.props.navigator} /> } />
          <Relay.RootContainer Component={MyProjectsView} route={meRoute} renderLoading={this.renderLoading} renderFailure={this.renderFailure} renderFetched={data => <MyProjectsView {...data} navigator={this.props.navigator} /> } />
        </View>
      </DrawerLayout>
    );
  }
}



class Project extends Component {

  renderScene(route, navigator) {
    let Component = route.component;

    return (
      <View style={{ flex: 1, }}>
        <Component navigator={navigator} route={route} />
      </View>
    );
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
        configureScene={(route) => {
         if (route.sceneConfig) {
           return route.sceneConfig;
         }
         return Navigator.SceneConfigs.FloatFromBottom;
       }}
        initialRoute={{
          component: ProjectsViewRedux,
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    meId: state.meId
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

var CreateProjectRelayContainerRedux = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectRelayContainer);

var ProjectsViewRedux = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsView);

var ProjectRedux = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);

module.exports = ProjectRedux;
