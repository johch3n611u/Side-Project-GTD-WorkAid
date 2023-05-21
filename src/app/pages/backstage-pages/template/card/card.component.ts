import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DialogHelperService } from 'src/app/shared/common/dialog-helper/dialog-helper.service';
import { FireStorageHelperService } from 'src/app/shared/common/fire-storage-helper/fire-storage-helper.service';
import { SnackBarHelperService } from 'src/app/shared/common/snack-bar-helper/snack-bar-helper.service';
import FirebaseModel from 'src/app/shared/models/firebase-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(
    private _FireStorageHelper: FireStorageHelperService,
    private _DialogHelper: DialogHelperService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _SnackBarHelper: SnackBarHelperService,
    public _DomSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.DataInit();
  }

  FirebaseModels = [] as FirebaseModel[];

  DataInit() {
    var _Collection = this._FireStorageHelper.GetFireCollection<FirebaseModel>('Article', ['Status', 'in', ['發佈'], 'StartDate']);

    let Data = _Collection.snapshotChanges().pipe(map((actions: DocumentChangeAction<FirebaseModel>[]) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as FirebaseModel;
        const id = a.payload.doc.id;
        // data.Content = this._DomSanitizer.bypassSecurityTrustHtml(data.Content);
        return { id, ...data };
      });
    })
    );

    var _Subscribe = Data.subscribe(ReturnData => {
      _Subscribe.unsubscribe();
      this.FirebaseModels = ReturnData;
      // init datatable
      let dataSource = new MatTableDataSource(this.FirebaseModels);
      // https://stackoverflow.com/questions/54367152/how-to-add-mat-paginator-for-mat-cards
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      // 目前這個都會幾筆資料就跑幾次... 效能異常...
      console.log(this.FirebaseModels);

    });
  }
}
