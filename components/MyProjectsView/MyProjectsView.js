'use strict';

import React, { Component } from 'react';
import { InteractionManager, Navigator, View } from 'react-native';
import Relay from 'react-relay';
import ActionButton from 'react-native-action-button';
import SMTINavigationBar from '../SMTINavigationBar';
import ProjectListView from '../ProjectListView';
import MyProjectsPlaceholder from '../MyProjectsPlaceholder';
import ProjectNavigationBar from '../ProjectNavigationBar';
import { IntroduceProjectMutation } from '../../mutations';
import { CreateProjectScene, TestCaseListScene } from '../../scenes';

const _first = 10;
const _next = 10;

import { registerDidIntroduceProject } from '../../stores/SubscriptionStore';
import { DidIntroduceProjectSubscription } from '../../subscriptions';

class MyProjectsView extends Component {
  constructor(props) {
    super(props);
    this._onPressRow = this._onPressRow.bind(this);
    this._createProject = this._createProject.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
  }

  _createProject() {
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromBottom,
        component: CreateProjectScene,
        passProps: {meId: this.props.meId}
    });
  }

  _onPressRow(project) {
    let projectId = project.id;
    let meId = this.props.me.id;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: TestCaseListScene,
        passProps: {projectId, meId}
    });
  }

  _onEndReached(cursor) {
    let first = this.props.relay.variables.first;
    this.props.relay.setVariables({
      first: first + _next,
      after: cursor
    });
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  subscribe() {
    if (this.props.me) {
      let me = this.props.me || {};
      let meId = me.id || '';

      registerDidIntroduceProject({meId}, () => {
        return Relay.Store.subscribe(
          new DidIntroduceProjectSubscription({me})
        );
      });
    }
  }

  render() {

    if(this.props.me) {
      let me = this.props.me
      if (me.originalProjects.edges.length > 0)  {
        return (
          <View style={{flex: 1}}>
            <ProjectListView projects={this.props.me.originalProjects} me={this.props.me} navigator={this.props.navigator} onPressRow={this._onPressRow} onEndReached={this._onEndReached}/>
            <ActionButton buttonColor='#FF4081' onPress={this._createProject} />
          </View>
        );
      } else {
        return this._renderPlaceholderView();
      }
    } else {
      return (
        <View></View>
      );
    }
  }

  _renderPlaceholderView() {
    return (
      <View style={{flex: 1}}>
        <MyProjectsPlaceholder />
        <ActionButton buttonColor='#FF4081' onPress={this._createProject} />
      </View>
    );
  }
}

export default Relay.createContainer(MyProjectsView, {
  initialVariables: {
    first: _first,
    after: null,
    moreFirst: _first
  },
  fragments: {
    me: () => Relay.QL`
    fragment on User {
      id
      originalProjects: projects(first: $first) {
        edges
        ${ProjectListView.getFragment('projects')},
      }
      moreProjects: projects(first: $moreFirst, after: $after) {
        ${ProjectListView.getFragment('projects')},
      }
      ${IntroduceProjectMutation.getFragment('me')},
      ${DidIntroduceProjectSubscription.getFragment('me')},
      ${ProjectListView.getFragment('me')},
    }
    `,
  },
});
