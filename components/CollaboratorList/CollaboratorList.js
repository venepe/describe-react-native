'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Image, ListView, Navigator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import SpinnerView from '../SpinnerView';
import CollaboratorListPlaceholder from '../CollaboratorListPlaceholder';
import CollaboratorListCellView from '../CollaboratorListCellView';

import { registerDidIntroduceCollaborator } from '../../stores/SubscriptionStore';
import { DidIntroduceCollaboratorSubscription } from '../../subscriptions';

const _first = 10;
const _next = 10;

class CollaborationList extends Component {
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
    this._onPressRow = this._onPressRow.bind(this);
    this._renderFooterSpinner = this._renderFooterSpinner.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
    this._getInitialState = this._getInitialState.bind(this);
    //
    this.state = this._getInitialState();
  }

  _onPressRow(collaborator) {
    this.props.onPressRow(collaborator);
  }

  _getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      hasNextPage: false,
      dataSource: ds.cloneWithRows(this.props.project.collaborators.edges)
    };
  }

  _getUpdatedState(project) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(project.collaborators.edges)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.project) {
      this.setState(this._getUpdatedState(nextProps.project));
    }
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

      registerDidIntroduceCollaborator({projectId}, () => {
        return Relay.Store.subscribe(
          new DidIntroduceCollaboratorSubscription({project})
        );
      });
    }
  }

  render() {
    if (this.props.project.collaborators.edges.length > 0) {
      return (
        <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderFooter={this._renderFooterSpinner}
        onEndReached={this._onEndReached}
      />
      );
    } else {
      return (<CollaboratorListPlaceholder />)
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
    let collaborator = rowData.node;
    let profile = collaborator.profile;
      return (
        <CollaboratorListCellView collaborator={collaborator} project={this.props.project} onPress={this._onPressRow} />
      );
  }

  _onEndReached() {
    let hasNextPage = this.props.project.collaborators.pageInfo.hasNextPage;
    this.setState({hasNextPage});
    let edges = this.props.project.collaborators.edges;
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
    backgroundColor: '#FAFAFA',
  },
});

export default Relay.createContainer(CollaborationList, {
  initialVariables: {
    first: _first,
    after: null,
    moreFirst: _first
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id
        collaborators (first: $first) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              ${CollaboratorListCellView.getFragment('collaborator')},
            }
          }
        }
        moreCollaborators: collaborators(first: $moreFirst, after: $after) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              ${CollaboratorListCellView.getFragment('collaborator')},
            }
          }
        }
        ${CollaboratorListCellView.getFragment('project')},
        ${DidIntroduceCollaboratorSubscription.getFragment('project')},
      }
    `,
  },
});
