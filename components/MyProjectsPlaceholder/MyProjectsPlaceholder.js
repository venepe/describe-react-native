'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

class MyProjectsPlaceholder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.mapContainer]}>
          <Image source={require('../../resources/assets/map/map.png')} height={100} width={100} />
          <View style={styles.textboxContainer}>
            <Text style={styles.text}>You have no events!</Text>
            <Text style={styles.text}>Start one and get done.</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FAFAFA'
  },
  mapContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: '#212121',
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  textboxContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  }
});

export default MyProjectsPlaceholder;
