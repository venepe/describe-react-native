'use strict';

export const FulfillmentImagePickerOptions = {
  title: 'Submit Fulfillment', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library', // specify null or empty string to remove this button
  // maxWidth: 100,
  // maxHeight: 100,
  quality: 0.2,
  allowsEditing: false, // Built in iOS functionality to resize/reposition the image
  noData: true, // Disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory)
    skipBackup: true, // image will NOT be backed up to icloud
    // path: 'images' // will save image at /Documents/images rather than the root
  }
};

export const CoverImagePickerOptions = {
  title: 'Change Cover Image', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library', // specify null or empty string to remove this button
  // maxWidth: 100,
  // maxHeight: 100,
  quality: 0.2,
  allowsEditing: false, // Built in iOS functionality to resize/reposition the image
  noData: true, // Disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory)
    skipBackup: true, // image will NOT be backed up to icloud
    // path: 'images' // will save image at /Documents/images rather than the root
  }
};
