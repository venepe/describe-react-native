'use strict';

import React from "react";
import { StyleSheet } from 'react-native';

const Common = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  coverImage: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#E0E0E0',
    height: 220
  },
  describeLabel: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '300',
    fontFamily: 'Roboto'
  },
  textbox: {
    height: 28, // 36
    fontSize: 17, // 25
    color: '#000000',
    fontWeight: '300', //500
    fontFamily: 'Roboto',
  },
  textboxContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white'
    },
  maxContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FAFAFA',
  },
  warningText: {
    color: '#F50F50',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto'
  },
});

export default Common;
