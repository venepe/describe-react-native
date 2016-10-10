'use strict';

import React, { Component } from 'react';
import { Navigator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Relay from 'react-relay';
import { Common } from '../../styles';
const Icon = require('react-native-vector-icons/EvilIcons');
import FileImage from '../FileImage';

import { FileScene } from '../../scenes';

class UserView extends Component {
  constructor(props) {
    super(props);
    this._pushFileImage = this._pushFileImage.bind(this);
  }

  _pushFileImage(fileId) {
    let title = this.props.user.name;
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: FileScene,
        passProps: {fileId, title}
    });
  }

  render() {
    if (this.props.user) {
      let user = this.props.user;
      let fullName = user.fullName || ' ';
      let summary = user.summary || 'No summary';

      return (
          <ScrollView style={styles.container}>
            <View>
              <FileImage style={Common.coverImage} file={this.props.user.cover} onPress={this._pushFileImage} />
              <View style={[Common.card, {padding: 10}]}>
                <Text style={[styles.userLabel]}>{this.props.user.name}</Text>
                <Text style={[styles.fullNameLabel]}>{fullName}</Text>
                <View style={[styles.bottomSpacer]}></View>
                <Text style={[styles.standardLabel, {paddingBottom: 10}]}>Summary</Text>
                <Text style={[styles.standardLabel]}>{summary}</Text>
              </View>
            </View>
          </ScrollView>
      );
    } else {
      return (
        <View style={{flex: 1}}></View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
  },
  userLabel: {
    color: '#212121',
    fontSize: 26,
    fontWeight: '500',
    fontFamily: 'Roboto'
  },
  fullNameLabel: {
    color: '#212121',
    fontSize: 18,
    fontWeight: '300',
    fontFamily: 'Roboto'
  },
  bottomSpacer: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#E6E6E6'
  },
  standardLabel: {
    color: '#212121',
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Roboto'
  },
});

export default Relay.createContainer(UserView, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        name
        email
        fullName
        summary
        cover {
          ${FileImage.getFragment('file')},
        }
      }
    `,
  },
});
