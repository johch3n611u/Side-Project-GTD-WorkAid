import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  DefaultBackgroundColor: string = '#E87A90';
  Msg: any;

  constructor(@Inject(MAT_DIALOG_DATA) private _DialogData: any) {

  }

  ngOnInit(): void {
    //console.clear();
    console.log(this._DialogData);
    this.Msg = this._DialogData;
  }

}
