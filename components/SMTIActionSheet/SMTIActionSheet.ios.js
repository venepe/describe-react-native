'use strict';

import { ActionSheetIOS } from 'react-native';

const showActionSheetWithOptions = (options, callback) => {
  ActionSheetIOS.showActionSheetWithOptions(options, (index) => {
    callback(index);
  });
}

const SMTIActionSheet = {
  showActionSheetWithOptions
};

export default SMTIActionSheet;
