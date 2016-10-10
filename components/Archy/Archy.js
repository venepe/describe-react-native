'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';

function getUUID() {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i=0; i < 8; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

class Archy extends Component {
  static propTypes = {
    archible: PropTypes.object
  }

  static defaultProps = {
    archible: {}
  }

  constructor(props) {
    super(props);

    this.state = {
      archible: props.archible
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      archible: nextProps.archible
    });
  }

  render() {

    function getLabel(node, isLast, index) {
      let nodes = node.nodes;
      let componentView;
      if (index === undefined) { index = 0 }

      if (isLast === undefined) {
        componentView = (
          <View>
            <View style={{flex: 1}}>
              {node.component}
            </View>
          </View>
        );
      } else if (isLast) {
        componentView = (
          <View style={styles.archyRowContainer}>
            <View style={styles.blockL}></View>
              <View style={{flex: 1}}>
                {node.component}
            </View>
          </View>
        );
      } else {
        componentView = (
          <View style={styles.archyRowContainer}>
            <View style={styles.blockLine}></View>
              <View style={{flex: 1}}>
                {node.component}
              </View>
          </View>
        );
      }
      let rows;
      let view;
      if (nodes) {
        rows = nodes.map((node, ix) => {
          let last = ix === nodes.length - 1;
          let more = node.nodes && node.nodes.length;
          return getLabel(node, last, ix);
        });
      }

      if (isLast === undefined) {
        view = (<View style={styles.archyContainer}>
          {componentView}
          {rows}
        </View>);
      } else if (isLast) {
        view = (
          <View style={styles.archyLastColumnContainer}>
            {componentView}
            {rows}
          </View>
        );
      } else {
        view = (
          <View style={styles.archyColumnContainer}>
            {componentView}
            {rows}
          </View>
        );
      }
      let uuidKey = node.key || index;
      return (
        <View key={uuidKey}>
          {view}
        </View>
      );
    }

    let view = getLabel(this.state.archible);

    return (
      <View>
        {view}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  archyContainer: {
    backgroundColor: '#FFFFFF',
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    padding: 20,
    marginBottom: 10
  },
  archyRowContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  archyColumnContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'transparent',
    borderLeftColor: 'black',
    marginLeft: 20
  },
  archyLastColumnContainer: {
    marginLeft: 20
  },
  blockLine: {
    width:20,
    marginTop:10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopColor: 'black'
  },
  blockL: {
    width:20,
    height:12,
    marginLeft: -1,
    marginTop: -2,
    borderWidth: 1,
    borderColor: 'transparent',
    borderLeftColor: 'black',
    borderBottomColor: 'black'
  },
});

export default Archy;
