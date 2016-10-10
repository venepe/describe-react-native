'use strict';

const coverImageSheetOptions = {
  title: 'Manage',
  options: [
    'Change Cover Image',
    'Delete Cover Image',
    'Cancel',
  ],
  cancelButtonIndex: 2
};

const coverImageSheetOptionsIndex = {
  CHANGE_COVER_IMAGE: 0,
  DELETE_COVER_IMAGE: 1
};

export const coverImageSheet = {
  options: coverImageSheetOptions,
  indexes: coverImageSheetOptionsIndex
}

export const androidify = (options = {}) => {
  let cancelButtonIndex = options.cancelButtonIndex;
  options.options.splice(cancelButtonIndex, 1);
  return {
    title: options.title,
    items: options.options,
    negativeText: 'Cancel'
  }
}
