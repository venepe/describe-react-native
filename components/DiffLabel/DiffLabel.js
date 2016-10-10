'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { diffWords } from 'diff';

class DiffLabel extends Component {
  static propTypes = {
      previous: PropTypes.string,
      current: PropTypes.string
    }

  static defaultProps = {
    previous: '',
    current: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      previous: props.previous,
      current: props.current,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      previous: nextProps.previous,
      current: nextProps.current,
    });
  }

  render() {
    let diff = diffWords(this.state.previous, this.state.current);
    let index = 0;
    let text = diff.map(part => {
      index++;
      let added = part.added;
      let removed = part.removed;
      let backgroundColor = added ? '#69F0AE' : removed ? '#FF5252' : '#FFFFFF';
      let value = part.value;
      return (<Text key={index} style={[styles.diff, {backgroundColor}]}>{value}</Text>);
    });
    return (
      <View style={[styles.container]}>
        <Text>
          {text}
        </Text>
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
    backgroundColor: 'white',
  },
  diff: {
    color: '#212121',
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
});

export default DiffLabel;
