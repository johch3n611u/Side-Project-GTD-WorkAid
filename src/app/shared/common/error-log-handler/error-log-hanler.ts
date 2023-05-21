// 參考
// https://ithelp.ithome.com.tw/articles/10207555

import { ErrorHandler } from '@angular/core';
import { DialogHelperService } from '../dialog-helper/dialog-helper.service';
import { MatDialogConfig } from '@angular/material/dialog';

export class ErrorLogHandler implements ErrorHandler {

  DialogConfig: MatDialogConfig<any> = {};

  constructor(public _DialogHelper: DialogHelperService) {

  }

  handleError(error: any): void {
    // console.error('handleError:', error);
    this.DialogConfig.data = error;
    this._DialogHelper.ShowMessage(this.DialogConfig);
  }
}
