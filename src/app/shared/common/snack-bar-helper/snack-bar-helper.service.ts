import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/pages/backstage-pages/components/layout/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarHelperService {

  constructor(
    private _SnackBar: MatSnackBar,
  ) {

  }

  // 輸入參數 https://stackoverflow.com/questions/50039741/get-data-from-matsnackbar-with-openfromcomponent
  // 背景顏色 https://stackoverflow.com/questions/47560696/angular-5-and-material-how-to-change-the-background-color-from-snackbar-compon
  OpenSnackBar(Msg: string) {
    this._SnackBar.openFromComponent(
      SnackBarComponent,
      {
        duration: 6000,
        data: Msg,
        panelClass: ['SnackBarStyleClass']
      }
    );
  }

}
