'use strict';

import React, { Component, PropTypes } from 'react';
import { ListView, StyleSheet } from 'react-native';
import Relay from 'react-relay';
import InvitationListCellView from '../InvitationListCellView';
import SpinnerView from '../SpinnerView';

class InvitationListView extends Component {
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
      dataSource: ds.cloneWithRows(this.props.invitations.edges)
    };
  }

  _getUpdatedState(invitations) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(invitations.edges)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.invitations) {
      this.setState(this._getUpdatedState(nextProps.invitations));
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

  // // rowData is an array of invitations
  _renderRow(rowData, sectionID, rowID)  {
    let invitation = rowData.node;
      return (
        <InvitationListCellView invitation={invitation} me={this.props.me}></InvitationListCellView>
      );
  }

  _onEndReached() {
    let hasNextPage = this.props.invitations.pageInfo.hasNextPage;
    let edges = this.props.invitations.edges;

    this.setState({hasNextPage});
    if (edges.length > 0 && hasNextPage) {
      this.props.onEndReached(edges[edges.length - 1].cursor);
    }
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

export default Relay.createContainer(InvitationListView, {
  fragments: {
    invitations: () => Relay.QL`
      fragment on InvitationConnection {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            ${InvitationListCellView.getFragment('invitation')},
          }
        }
      }
    `,
    me: () => Relay.QL`
      fragment on User {
        ${InvitationListCellView.getFragment('me')},
      }
    `,
  },
});
