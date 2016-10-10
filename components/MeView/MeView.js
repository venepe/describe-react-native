'use strict';

import React, { Component } from 'react';
import { Navigator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Relay from 'react-relay';
import SMTINavigationBar from '../SMTINavigationBar';
import { Common } from '../../styles';
const Icon = require('react-native-vector-icons/EvilIcons');
import CoverImage from '../CoverImage';

import { CoverImageScene } from '../../scenes';

class MeView extends Component {
  constructor(props) {
    super(props);
    this._pushCoverImage = this._pushCoverImage.bind(this);
  }

  _pushCoverImage(coverImageId) {
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.PushFromRight,
        component: CoverImageScene,
        passProps: {coverImageId, userId: this.props.me.id}
    });
  }

  render() {
    if (this.props.me) {
      let me = this.props.me;
      let fullName = this.props.me.fullName || ' ';
      let summary = this.props.me.summary || 'No summary';

      return (
          <ScrollView style={styles.container}>
            <View>
              <CoverImage style={Common.coverImage} coverImage={this.props.me.cover} user={me} onPress={this._pushCoverImage} />
              <View style={[Common.card, {padding: 10}]}>
                <Text style={[styles.userLabel]}>{this.props.me.name}</Text>
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

export default Relay.createContainer(MeView, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        id
        name
        email
        fullName
        summary
        cover {
          ${CoverImage.getFragment('coverImage')},
        }
        ${CoverImage.getFragment('user')},
      }
    `,
  },
});
