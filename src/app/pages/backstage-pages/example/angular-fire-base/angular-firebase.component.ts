// 參考
// firebase CRUD https://github.com/angular/angularfire/blob/master/docs/rtdb/lists.md

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FireStorageHelperService } from '../../../../shared/common/fire-storage-helper/fire-storage-helper.service';
import { DialogHelperService } from '../../../../shared/common/dialog-helper/dialog-helper.service';
import { MatDialogConfig } from '@angular/material/dialog';

import { SharedService } from '../../../../shared/services/shared/shared.service'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData, QueryFn } from '@angular/fire/firestore';

@Component({
  selector: './app-demo-angular-fire-base',
  templateUrl: './angular-firebase.component.html',
  styleUrls: ['./angular-firebase.component.css']
})
export class AngularFirebaseComponent implements OnInit {

  items$: Observable<any[]>;
  // item$: Observable<any>;
  // ServiceItems: Observable<any[]>;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  DialogConfig: MatDialogConfig<any> = {};

  SharedServiceTest: any;

  constructor(
    private _FireStorageHelper: FireStorageHelperService,
    private _db: AngularFireDatabase,
    private _AngularFirestore: AngularFirestore,
    private _DialogHelper: DialogHelperService,
    private _SharedService: SharedService,
  ) {

    _SharedService.SharedData.subscribe(x => { this.SharedServiceTest = x; })

    this.items = _FireStorageHelper.GetKeys('items');
    // console.log('this.items', this.items);
    this.itemsRef = _db.list('items');

    // console.log('this._db', this._db);
    // 訂閱觀察者物件後，雲 db 資料改動，同時也會影響此處資料改動
    // snapshotChanges() 資料本身(payload)、key、prevKey、type
    this.items$ = this._db.list("items").valueChanges();

    // 直接使用 fireAG 方法操作 valueChanges() 資料本身不包含key
    // this.item$ = this._db.object('item').valueChanges();

    // 利用共用 Service 取得觀察者物件
    // this.ServiceItems = this._FireStorageHelper.GetKeys("item");
    // console.log('this.ServiceItems', this.ServiceItems);
    // 觀察者物件在訂閱回傳時 console.log
    // this.item$.subscribe(x => { console.log('subscribe:' + x); });


    // firebase where 函數 https://firebase.google.com/docs/firestore/query-data/queries
    // this._FireStorageHelper.GetFireCollection('Task', ['Tags', 'array-contains-any', ['未處理']]).valueChanges().subscribe(x => { console.log('array-contains-any', x) });

    // not in array https://stackoverflow.com/questions/52085868/firestore-get-documents-where-value-not-in-array
    // this._FireStorageHelper.GetFireCollection('Task', ['Tags', '!=', '未處理', 'Tags', 'EndDate']).valueChanges().subscribe(x => { console.log('not-in', x) });
    // 因為效能關係不提供 array not in xx ...
    // 只想到兩種思路 1. 改 table 為字串符合 not-in // 2.在處理結束時自動去掉未處理與添加已處理


    // collection 要建立索引才能多重搜索... 建立等半天就先睡了
    var collection = this._AngularFirestore.collection('Task', ref => ref.where('Tags', 'array-contains-any', ['未處理']).orderBy('EndDate'));
    collection.valueChanges().subscribe(x => { console.log('collection', x); });
    // 共用函式
    let test = this._FireStorageHelper.GetFireCollection('Task', ['Tags', 'array-contains-any', ['未處理'], 'EndDate']);

  }

  ngOnInit(): void {
  }

  addItem(newName: string) {
    this.itemsRef.push({ text: newName })
      .then(_ => {
        console.log('success');
        this._DialogHelper.ShowMessage(this.DialogConfig);
      })
      .catch(err => {
        this.DialogConfig.data = err;
        console.log(err, 'You do not have access!');
        this._DialogHelper.ShowMessage(this.DialogConfig);
      });
  }

  updateItem(key: string, newText: string) {
    console.log('key:', key, 'newText:', newText);
    this.itemsRef.update(key, { text: newText })
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You do not have access!'));
  }

  deleteItem(key: string) {
    this.itemsRef.remove(key)
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You do not have access!'));
  }

  deleteEverything() {
    this.itemsRef.remove()
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You do not have access!'));
  }

}
