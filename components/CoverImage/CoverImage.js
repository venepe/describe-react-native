'use strict';

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import ModalableImage from '../ModalableImage';
import { DeleteUserCoverMutation, IntroduceUserCoverMutation } from '../../mutations';
import { coverImageSheet } from '../../constants/SheetOptions';
import { CoverImagePickerOptions } from '../../constants/ImagePickerOptions';
import SMTIAnalytics from '../../lib/SMTIAnalytics';

const ImagePickerManager = require('NativeModules').ImagePickerManager;

class CoverImage extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
  }

  static defaultProps = {
    onPress: function() {},
    onDelete: function() {},
    onUpdate: function() {}
  }

  constructor(props) {
    super(props);
    this._onCoverSheetItem = this._onCoverSheetItem.bind(this);
    this._onPress = this._onPress.bind(this);

    this.state = {
      style: props.style
    }
  }

  _onPress() {
    if (this.props.coverImage) {
      this.props.onPress(this.props.coverImage.id);
    }
  }

  _onCoverSheetItem(index, id) {
    const coverImageSheetIndexes = coverImageSheet.indexes;
    if (index === coverImageSheetIndexes.CHANGE_COVER_IMAGE) {
      //Add cover image
      ImagePickerManager.showImagePicker(CoverImagePickerOptions, (response) => {
        if (!response.didCancel) {
          let uri = response.uri.replace('file://', '');
          this.props.onUpdate();
          Relay.Store.commitUpdate(
            new IntroduceUserCoverMutation({uri, user: this.props.user})
          );

          //Start SMTIAnalytics
          SMTIAnalytics.track(SMTIAnalytics.Events.ADDED_COVER_IMAGE);
          //End SMTIAnalytics

        }
      });

    } else if (index === coverImageSheetIndexes.DELETE_COVER_IMAGE && this.props.coverImage) {
      this.props.onDelete(this.props.coverImage.id);
      Relay.Store.commitUpdate(
        new DeleteUserCoverMutation({coverImage: this.props.coverImage, user: this.props.user})
      );
    }
  }

  render() {
    let uri = null;
    let id = '';
    if (this.props.coverImage) {
      uri = this.props.coverImage.uri;
      id = this.props.coverImage.id;
    }
    return (
      <ModalableImage id={id} style={this.state.style} source={{uri: uri}} sheetOptions={coverImageSheet.options} onPress={this._onPress} onPressSheetItem={this._onCoverSheetItem} />
    );
  }
}

export default Relay.createContainer(CoverImage, {
  fragments: {
    coverImage: () => Relay.QL`
      fragment on Cover {
        id
        uri
        ${DeleteUserCoverMutation.getFragment('coverImage')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id
        ${IntroduceUserCoverMutation.getFragment('user')},
        ${DeleteUserCoverMutation.getFragment('user')},
      }
    `,
  },
});
