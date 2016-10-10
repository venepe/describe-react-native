'use strict';

import React, { Component, PropTypes } from 'react';
import { ListView, StyleSheet } from 'react-native';
import Relay from 'react-relay';
import ProjectListCellView from '../ProjectListCellView';
import SpinnerView from '../SpinnerView';

class ProjectListView extends Component {
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
    this._renderFooterSpinner = this._renderFooterSpinner.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
    this._getInitialState = this._getInitialState.bind(this);
    //
    this.state = this._getInitialState();
    this._onPress = this._onPress.bind(this);
  }

  _getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      hasNextPage: false,
      dataSource: ds.cloneWithRows(this.props.projects.edges)
    };
  }

  _getUpdatedState(projects) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(projects.edges)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects) {
      this.setState(this._getUpdatedState(nextProps.projects));
    }
  }

  render() {
    return (
      <ListView
      style={styles.list}
      dataSource={this.state.dataSource}
      renderRow={this._renderRow}
      renderFooter={this._renderFooterSpinner}
      onEndReached={this._onEndReached}
    />
    );
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
    let project = rowData.node;
      return (
        <ProjectListCellView project={project} me={this.props.me} onPress={this._onPress}></ProjectListCellView>
      );
  }

  _onEndReached() {
    let hasNextPage = this.props.projects.pageInfo.hasNextPage;
    let edges = this.props.projects.edges;

    this.setState({hasNextPage});
    if (edges.length > 0 && hasNextPage) {
      this.props.onEndReached(edges[edges.length - 1].cursor);
    }
  }

  _onPress(project) {
    this.props.onPressRow(project);
  }

}


const styles = StyleSheet.create({
  list: {
    backgroundColor: '#FAFAFA',
  },
  title: {
    color: '#212121',
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  titleContainer: {
    margin: 10
  },
  subtitle: {
    color: '#9e9e9e',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
});

export default Relay.createContainer(ProjectListView, {
  fragments: {
    projects: () => Relay.QL`
      fragment on ProjectConnection {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            ${ProjectListCellView.getFragment('project')},
          }
        }
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        ${ProjectListCellView.getFragment('me')},
      }
    `,
  },
});
