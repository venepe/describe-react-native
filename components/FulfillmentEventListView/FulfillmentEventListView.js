'use strict';

import React, { Component, PropTypes } from 'react';
import { Image, ListView, Navigator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import moment from 'moment';
import SpinnerView from '../SpinnerView';
import { Common } from '../../styles';
import { FileScene } from '../../scenes';

const _first = 10;
const _next = 10;

class FulfillmentEventListView extends Component {
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
    this._onPress = this._onPress.bind(this);
    //
    this.state = this._getInitialState();
  }

  _getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      hasNextPage: false,
      dataSource: ds.cloneWithRows(this.props.fulfillment.events.edges)
    };
  }

  _getUpdatedState(fulfillment) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(fulfillment.events.edges)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fulfillment) {
      this.setState(this._getUpdatedState(nextProps.fulfillment));
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

  _onPress(node) {
    let fileId = node.id;
    let title = moment(node.createdAt).format('MMM DD, YYYY hh:mm A');
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: FileScene,
        passProps: {fileId, title}
    });
  }

  // // rowData is an array of fulfillments
  _renderRow(rowData, sectionID, rowID)  {
    let index = rowID;
    let node = rowData.node || {};
    let author = node.author || {};
    let uri = node.uri;
      return (
        <View style={Common.card}>
          <TouchableOpacity onPress={() => {this._onPress(node)}}>
          <Image style={Common.coverImage} source={{uri}} />
          <View style={{padding: 10}}>
            <Text style={styles.status}>{rowData.node.status}</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.author}>{author.name}</Text>
              <Text style={styles.dateCreated}>{moment(node.createdAt).format('MMM DD, YYYY hh:mm A')}</Text>
            </View>
          </View>
        </TouchableOpacity>
        </View>
      );
  }

  _onEndReached() {
    let hasNextPage = this.props.fulfillment.events.pageInfo.hasNextPage;
    this.setState({hasNextPage});
    let edges = this.props.fulfillment.events.edges;
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
  status: {
    color: '#212121',
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Roboto',
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

export default Relay.createContainer(FulfillmentEventListView, {
  initialVariables: {
    first: _first,
    after: null,
    moreFirst: _first
  },
  fragments: {
    fulfillment: () => Relay.QL`
      fragment on Fulfillment {
        id
        events (first: $first) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              status
              uri
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
              status
              uri
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
    testCase: () => Relay.QL`
      fragment on TestCase {
        id
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
      }
    `,
  },
});
