'use strict';

import React, { Component, PropTypes } from 'react';
import { Image, ListView, Navigator, StyleSheet, Text, View } from 'react-native';
import Relay from 'react-relay';
import TestCaseListCell from '../TestCaseListCell';
import TestCasePlaceholder from '../TestCasePlaceholder';
import SpinnerView from '../SpinnerView';
import ProjectActionButton from '../ProjectActionButton';
import { Common } from '../../styles';

import { TestCaseScene } from '../../scenes';
import { registerDidIntroduceTestCase, registerDidUpdateProject } from '../../stores/SubscriptionStore';
import { DidUpdateProjectSubscription, DidIntroduceTestCaseSubscription } from '../../subscriptions';

const _first = 10;
const _next = 10;

class TestCaseListView extends Component {
  static propTypes = {
    onPressRow: PropTypes.func,
    onEndReached: PropTypes.func
  }

  static defaultProps = {
    onPressRow: function() {},
    onEndReached: function() {}
  }

  constructor(props) {
    super(props);
    this._pushTestCase = this._pushTestCase.bind(this);
    this._renderFooterSpinner = this._renderFooterSpinner.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
    this._getInitialState = this._getInitialState.bind(this);
    //
    this.state = this._getInitialState();
  }

  _getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let project = this.props.project;
    let testCaseEdges = [];
    if (project) {
      testCaseEdges = project.testCases.edges;
    }
    return {
      hasNextPage: false,
      dataSource: ds.cloneWithRows(testCaseEdges)
    };
  }

  _getUpdatedState(project) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(project.testCases.edges)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.project) {
      this.setState(this._getUpdatedState(nextProps.project));
    }
  }

  _pushTestCase({testCaseId}) {
    const projectId = this.props.project.id;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: TestCaseScene,
        passProps: {testCaseId, projectId}
    })
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  subscribe() {
    if (this.props.project) {
      let project = this.props.project;
      let projectId = project.id;

      registerDidUpdateProject({projectId}, () => {
        return Relay.Store.subscribe(
          new DidUpdateProjectSubscription({project})
        );
      });
      registerDidIntroduceTestCase({projectId}, () => {
          return Relay.Store.subscribe(
            new DidIntroduceTestCaseSubscription({project})
          );
      });
    }
  }

  render() {
    let project = this.props.project;
    if (project) {
      if (project.testCases.edges.length > 0) {
        return (
          <View style={{flex: 1}}>
            <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderFooter={this._renderFooterSpinner}
            onEndReached={this._onEndReached}
            />
            <ProjectActionButton project={this.props.project} me={this.props.me} navigator={this.props.navigator} />
          </View>
        );
      } else {
        return (
          <View style={{flex: 1}}>
            <TestCasePlaceholder />
            <ProjectActionButton project={this.props.project} me={this.props.me} navigator={this.props.navigator} />
          </View>
        );
      }
    } else {
      return (
        <View></View>
      );
    }
  }

  _renderFooterSpinner() {
    if (this.state.hasNextPage) {
      return <SpinnerView />;
    } else {
      return null;
    }
  }

  // // rowData is an array of projects
  _renderRow(rowData, sectionID, rowID)  {
    let index = rowID;
    let testCase = rowData.node;

    return (
      <TestCaseListCell project={this.props.project} testCase={testCase} onPress={this._pushTestCase} navigator={this.props.navigator} />
    );
  }

  _onEndReached() {
    let hasNextPage = this.props.project.testCases.pageInfo.hasNextPage;
    this.setState({hasNextPage});
    let edges = this.props.project.testCases.edges;
    if (edges.length > 0) {
      let cursor = edges[edges.length - 1].cursor;
      let first = this.props.relay.variables.first;
      this.props.relay.setVariables({
        first: first + _next,
        after: cursor
      });
    }
  }

}


const styles = StyleSheet.create({
  list: {
    backgroundColor: '#FFFFFF',
  },
  fulfillmentCell: {
    borderWidth: 10,
    marginLeft: 10,
    borderColor: 'transparent',
  },
});

export default Relay.createContainer(TestCaseListView, {
  initialVariables: {
    first: _first,
    after: null,
    moreFirst: _first
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id
        text
        testCases(first: $first) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              status
              ${TestCaseListCell.getFragment('testCase')},
            }
          }
        }
        moreTestCases: testCases(first: $moreFirst, after: $after) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              ${TestCaseListCell.getFragment('testCase')},
            }
          }
        }
        ${ProjectActionButton.getFragment('project')},
        ${TestCaseListCell.getFragment('project')},
        ${DidUpdateProjectSubscription.getFragment('project')},
        ${DidIntroduceTestCaseSubscription.getFragment('project')},
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        ${ProjectActionButton.getFragment('me')},
      }
    `,
  },
});
