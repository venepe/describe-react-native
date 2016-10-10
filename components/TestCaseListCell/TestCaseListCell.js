'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Image, Navigator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Relay from 'react-relay';
import Swipeout from 'react-native-swipeout';
import MessageButton from '../MessageButton';
import SMTIActionSheet from '../SMTIActionSheet';
import FulfillmentStatusButton from '../FulfillmentStatusButton';
import { Common } from '../../styles';
import { FulfillmentImagePickerOptions } from '../../constants/ImagePickerOptions';
import SMTIAnalytics from '../../lib/SMTIAnalytics';
import { DeleteTestCaseMutation, UpdateFulfillmentMutation } from '../../mutations';
import { hasDeleteNodePerm, hasUpdateNodePerm } from '../../lib/permissions';

import { registerDidDeleteTestCase, registerDidUpdateFulfillment, registerDidUpdateTestCase } from '../../stores/SubscriptionStore';
import { DidDeleteTestCaseSubscription, DidUpdateFulfillmentSubscription, DidUpdateTestCaseSubscription } from '../../subscriptions';
import { ChannelScene, UpdateTestCaseScene } from '../../scenes';

import ImagePicker from 'react-native-image-picker';

class TestCaseListCellView extends Component {
  static propTypes = {
    key: PropTypes.number,
    onPress: PropTypes.func,
    onPressSheetItem: PropTypes.func
  }

  static defaultProps = {
    key: 0,
    onPress: function() {},
    onPressSheetItem: function() {}
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this._onFulfillmentPress = this._onFulfillmentPress.bind(this);
    this._pushMessage = this._pushMessage.bind(this);
    this.didSelectUpdate = this.didSelectUpdate.bind(this);
    this.didSelectDelete = this.didSelectDelete.bind(this)
    this.deleteTestCase = this.deleteTestCase.bind(this)
    this.getFulfillment = this.getFulfillment.bind(this);
  }

  _onPress(fulfillmentId) {
    let testCaseId = this.props.testCase.id;
    this.props.onPress({testCaseId, fulfillmentId});
  }

  _pushMessage() {
    let navigator = this.props.navigator;
    let channelId = this.props.testCase.id;
    let title = this.props.testCase.text;
    navigator.push({
      sceneConfig: Navigator.SceneConfigs.FadeAndroid,
      component: ChannelScene,
      passProps: {navigator, channelId, title}
    });
  }

  didSelectUpdate() {
    let navigator = this.props.navigator;
    let testCaseId = this.props.testCase.id;
    let projectId = this.props.project.id;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromBottom,
        component: UpdateTestCaseScene,
        passProps: {navigator, testCaseId, projectId}
    });
  }

  _onFulfillmentPress() {
    const status = 'SUBMITTED';
    ImagePicker.launchCamera(FulfillmentImagePickerOptions, (response) => {
      if (!response.didCancel && !response.error) {
        let uri = response.uri.replace('file://', '');
        let fulfillment = this.getFulfillment();

        Relay.Store.commitUpdate(
          new UpdateFulfillmentMutation({fulfillment, testCase: this.props.testCase, project: this.props.project, status, uri})
        );

        //Start SMTIAnalytics
        SMTIAnalytics.track(SMTIAnalytics.Events.FULFILLED_TEST_CASE);
        //End SMTIAnalytics

      }
    });
  }

  didSelectDelete() {
    Alert.alert(
      'Delete Moment?',
      'Do you wish to continue?',
      [
        {text: 'Cancel'},
        {text: 'Yes', onPress: this.deleteTestCase},
      ]
    );
  }

  deleteTestCase() {
    Relay.Store.commitUpdate(
      new DeleteTestCaseMutation({testCase: this.props.testCase, project: this.props.project})
    );
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  subscribe() {
    if (this.props.project && this.props.testCase) {
      let project = this.props.project;
      let testCase = this.props.testCase;
      let projectId = project.id;
      let testCaseId = testCase.id;
      let fulfillment = this.getFulfillment();
      let fulfillmentId = fulfillment.id;

      registerDidUpdateTestCase({testCaseId}, () => {
        return Relay.Store.subscribe(
          new DidUpdateTestCaseSubscription({testCase})
        );
      });

      registerDidDeleteTestCase({testCaseId, projectId}, () => {
        return Relay.Store.subscribe(
          new DidDeleteTestCaseSubscription({testCase, project})
        );
      });

      registerDidUpdateFulfillment({fulfillmentId, testCaseId}, () => {
        return Relay.Store.subscribe(
          new DidUpdateFulfillmentSubscription({fulfillment, testCase})
        );
      });
    }
  }

  getFulfillment() {
    let fulfillment = {};
    let testCase = this.props.testCase || {};
    let fulfillments = testCase.fulfillments || {};
    let edges = fulfillments.edges || [];
    if (edges.length > 0) {
      fulfillment = edges[0].node || {};
    }

    return fulfillment;
  }

  render() {
    let uri = '';
    let fulfillmentId = '';
    let testCase = this.props.testCase || {};
    let permission = testCase.permission;
    let fulfillment = this.getFulfillment();
    uri = fulfillment.uri;
    fulfillmentId = fulfillment.id;
    let right = [];
    if (permission > 0) {
      right.push({text: 'Cancel', color: '#FFFFFF', backgroundColor: '#9E9E9E'});
      if (hasUpdateNodePerm(permission)) {
        right.push({text: 'Edit', color: '#FFFFFF', backgroundColor: '#FFD740', onPress: this.didSelectUpdate});
      }
      if (hasDeleteNodePerm(permission)) {
        right.push({text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF5252', onPress: this.didSelectDelete});
      }
    }

    return (
      <View>
        <Swipeout right={right} autoClose={true}>
          <TouchableOpacity onPress={() => {this._onPress(fulfillmentId)}}>
            <Image resizeMode={'cover'} style={[Common.coverImage]} source={{uri}}>
              <View style={styles.buttonContainer}>
                <View>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}} >
                    <FulfillmentStatusButton onPress={this._onFulfillmentPress} />
                  </View>
                </View>
                <MessageButton channel={testCase} onPress={this._pushMessage} />
              </View>
              <View style={styles.textContainer} >
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}} >
                  <Text style={styles.text}>{testCase.text}</Text>
                </View>
              </View>
            </Image>
          </TouchableOpacity>
        </Swipeout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    padding: 5,
    fontWeight: '400',
    fontFamily: 'Roboto',
    backgroundColor: '#000000',
  },
});

export default Relay.createContainer(TestCaseListCellView, {
  fragments: {
    testCase: () => Relay.QL`
      fragment on TestCase {
        id
        status
        text
        permission
        fulfillments(first: 1) {
          edges {
            cursor
            node {
              id
              status
              uri
              permission
              ${UpdateFulfillmentMutation.getFragment('fulfillment')},
              ${DidUpdateFulfillmentSubscription.getFragment('fulfillment')},
            }
          }
        }
        ${MessageButton.getFragment('channel')},
        ${DeleteTestCaseMutation.getFragment('testCase')},
        ${UpdateFulfillmentMutation.getFragment('testCase')},
        ${DidDeleteTestCaseSubscription.getFragment('testCase')},
        ${DidUpdateTestCaseSubscription.getFragment('testCase')},
        ${DidUpdateFulfillmentSubscription.getFragment('testCase')},
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id
        ${DeleteTestCaseMutation.getFragment('project')},
        ${UpdateFulfillmentMutation.getFragment('project')},
        ${DidDeleteTestCaseSubscription.getFragment('project')},
      }
    `,
  },
});
