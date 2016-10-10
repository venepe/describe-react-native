'use strict';

import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import EditButton from '../EditButton';
import SMTIActionSheet from '../SMTIActionSheet';

class ModalableImage extends Component {
  static propTypes = {
    id: PropTypes.string,
    sheetOptions: PropTypes.object,
    onPress: PropTypes.func,
    onPressSheetItem: PropTypes.func
  }

  static defaultProps = {
    id: '',
    source: null,
    style: null,
    sheetOptions: {},
    onPress: function() {},
    onPressSheetItem: function() {}
  }

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this._onModalPress = this._onModalPress.bind(this);

    this.state = {
      source: props.source,
      style: props.style,
      id: props.id,
      sheetOptions: props.sheetOptions
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  _onPress() {
    this.props.onPress(this.state.id);
  }

  _onModalPress() {
    let options = this.state.sheetOptions;

    SMTIActionSheet.showActionSheetWithOptions(options, (index) => {
      this.props.onPressSheetItem(index, this.state.id);
    });
  }

  render() {
    return (
        <TouchableOpacity style={this.state.style} onPress={this._onPress}>
          <Image resizeMode={'cover'} style={{flex: 1}} source={this.state.source}>
            <View style={styles.buttonContainer}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}} >
                <EditButton onPress={this._onModalPress} />
              </View>
            </View>
          </Image>
        </TouchableOpacity>
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
});

export default ModalableImage;
