'use strict';

import React, { Component, PropTypes } from 'react';
import { ListView, StyleSheet, Text, View } from 'react-native';
import Relay from 'react-relay';
import moment from 'moment';
import DiffLabel from '../DiffLabel';
import SpinnerView from '../SpinnerView';
import { Common } from '../../styles';

const _first = 10;
const _next = 10;

class TestCaseEventListView extends Component {
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
  }

  _getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      hasNextPage: false,
      dataSource: ds.cloneWithRows(this.props.testCase.events.edges)
    };
  }

  _getUpdatedState(testCase) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(testCase.events.edges)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.testCase) {
      this.setState(this._getUpdatedState(nextProps.testCase));
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

  // // rowData is an array of testCases
  _renderRow(rowData, sectionID, rowID)  {
    let index = parseInt(rowID);
    let current = rowData.node.text;
    let previous = (index > 0) ? this.props.testCase.events.edges[index - 1].node.text : current;
    let author = rowData.node.author || {};
      return (
        <View style={[Common.card, {padding: 10}]}>
          <DiffLabel previous={previous} current={current}></DiffLabel>
          <View style={styles.subtitleContainer}>
            <Text style={styles.author}>{author.name}</Text>
            <Text style={styles.dateCreated}>{moment(rowData.node.createdAt).format('MMM DD, YYYY hh:mm A')}</Text>
          </View>
        </View>
      );
  }

  _onEndReached() {
    let hasNextPage = this.props.testCase.events.pageInfo.hasNextPage;
    this.setState({hasNextPage});
    let edges = this.props.testCase.events.edges;
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
  subtitleContainer: {
    marginTop: 2
  },
  author: {
    color: '#9e9e9e',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  dateCreated: {
    color: '#9e9e9e',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
});

export default Relay.createContainer(TestCaseEventListView, {
  initialVariables: {
    first: _first,
    after: null,
    moreFirst: _first
  },
  fragments: {
    testCase: () => Relay.QL`
      fragment on TestCase {
        events (first: $first) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              text
              createdAt
              author {
                id
                name
              }
            }
          }
        }
        moreEvents: events(first: $moreFirst, after: $after) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              text
              createdAt
              author {
                id
                name
              }
            }
          }
        }
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
      }
    `,
  }
});
