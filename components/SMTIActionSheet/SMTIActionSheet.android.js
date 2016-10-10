'use strict';

const DialogAndroid = require('react-native-dialogs');
import { androidify } from '../../constants/SheetOptions';

const showActionSheetWithOptions = (options, callback) => {
  let dialog = new DialogAndroid();
  options = androidify(options);
  options.itemsCallback = (index) => callback(index);
  dialog.set(options);
  dialog.show();
}

const SMTIActionSheet = {
  showActionSheetWithOptions
};

export default SMTIActionSheet;
