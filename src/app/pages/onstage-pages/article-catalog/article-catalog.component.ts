import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogHelperService } from 'src/app/shared/common/dialog-helper/dialog-helper.service';
import { FireStorageHelperService } from 'src/app/shared/common/fire-storage-helper/fire-storage-helper.service';
import { SnackBarHelperService } from 'src/app/shared/common/snack-bar-helper/snack-bar-helper.service';
import { TagsHelperService } from 'src/app/shared/common/tags-helper/tags-helper.service';
import FirebaseModel from 'src/app/shared/models/firebase-model';


@Component({
  selector: 'app-article-catalog',
  templateUrl: './article-catalog.component.html',
  styleUrls: ['./article-catalog.component.css']
})
export class ArticleCatalogComponent implements OnInit {

  constructor(
    private _FireStorageHelper: FireStorageHelperService,
    private _DialogHelper: DialogHelperService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _SnackBarHelper: SnackBarHelperService,
    public _DomSanitizer: DomSanitizer,
    private _TagsHelper: TagsHelperService,
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<FirebaseModel> = new MatTableDataSource<FirebaseModel>();

  ngOnInit(): void {
    this.DataInit();
    this.TagsInit();
  }

  Obs: Observable<any>;
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
      this.FirebaseModels = JSON.parse(JSON.stringify(ReturnData));
      this.FirebaseModels.forEach((data: any) => {
        data.DisplaySummary = data.Summary.substr(0, 100);
      })
      // init datatable
      this.dataSource = new MatTableDataSource(this.FirebaseModels);
      // https://stackoverflow.com/questions/54367152/how-to-add-mat-paginator-for-mat-cards
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      // 目前這個都會幾筆資料就跑幾次... 效能異常...
      // console.log(this.FirebaseModels);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "每頁顯示";
      this.Obs = this.dataSource.connect();
      console.log('InitData', this.FirebaseModels);
    });
  }

  allTags: any;

  TagsInit() {
    var Subscribe = this._TagsHelper.GetTagsSubscribe().subscribe((x: any) => {
      this.allTags = JSON.parse(x);
      Subscribe.unsubscribe();
    });
  }
}
