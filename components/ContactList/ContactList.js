'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Image, ListView, Navigator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import SpinnerView from '../SpinnerView';
import ContactListPlaceholder from '../ContactListPlaceholder';
import ContactListCellView from '../ContactListCellView';

import { registerDidIntroduceContact } from '../../stores/SubscriptionStore';
import { DidIntroduceContactSubscription } from '../../subscriptions';

const _first = 30;
const _next = 30;

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

  _onPressRow(contact) {
    this.props.onPressRow(contact);
  }

  _getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      hasNextPage: false,
      dataSource: ds.cloneWithRows(this.props.me.contacts.edges)
    };
  }

  _getUpdatedState(me) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(me.contacts.edges)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.me) {
      this.setState(this._getUpdatedState(nextProps.me));
    }
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  subscribe() {
    if (this.props.me) {
      let me = this.props.me;
      let meId = me.id;

      registerDidIntroduceContact({meId}, () => {
        return Relay.Store.subscribe(
          new DidIntroduceContactSubscription({me})
        );
      });
    }
  }

  render() {
    if (this.props.me.contacts.edges.length > 0) {
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
      return (<ContactListPlaceholder />)
    }
  }

  _renderFooterSpinner() {
    if (this.state.hasNextPage) {
      return <SpinnerView />;
    } else {
      return null;
    }
  }

  // // rowData is an array of mes
  _renderRow(rowData, sectionID, rowID)  {
    let contact = rowData.node;
    let profile = contact.profile;
      return (
        <ContactListCellView contact={contact} me={this.props.me} onPress={this._onPressRow} />
      );
  }

  _onEndReached() {
    let hasNextPage = this.props.me.contacts.pageInfo.hasNextPage;
    this.setState({hasNextPage});
    let edges = this.props.me.contacts.edges;
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
    me: () => Relay.QL`
      fragment on User {
        id
        contacts (first: $first) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              ${ContactListCellView.getFragment('contact')},
            }
          }
        }
        moreContacts: contacts(first: $moreFirst, after: $after) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              ${ContactListCellView.getFragment('contact')},
            }
          }
        }
        ${ContactListCellView.getFragment('me')},
        ${DidIntroduceContactSubscription.getFragment('me')},
      }
    `,
  },
});
