// 參考
// 實作類似 Flux https://medium.com/4cats-io/%E6%B7%B1%E5%85%A5%E6%B7%BA%E5%87%BA-flux-44a48c320e11
// angularfire 套件官網 https://github.com/angular/angularfire
// [Angular Firebase 入門與實做] https://ithelp.ithome.com.tw/m/articles/10193310
// [Angular] 與 Firebase 共舞 https://blog.kevinyang.net/2018/04/30/angular-firebase/
// 免費額度 https://firebase.google.com/pricing/
// where https://stackoverflow.com/questions/49847624/array-of-operators-for-a-firestore-query
// WhereFilterOp https://stackoverflow.com/questions/49847624/array-of-operators-for-a-firestore-query

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData, QueryFn } from '@angular/fire/firestore';
import { WhereFilterOp } from '@firebase/firestore-types';

export class FirestoreQuery {
  field: string;
  operator: WhereFilterOp;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class FireStorageHelperService {


  // 建構子( 注入此類別參數 ){ 建構子執行之方法 }
  constructor(
    private _RealtimeDatabase: AngularFireDatabase,
    private _CloudFirestore: AngularFirestore
  ) {
    // 建構此 service 時就會執行
  }

  // 方法名稱< 型別 >( 參數:型別 ) : 回傳值型別 { 方法實作 return 回傳值; }
  // GetObservableList<T>(ValuePath: string): Observable<T> | Observable<any> {
  //   const _data = this._RealtimeDatabase.list(ValuePath);
  //   return _data.valueChanges();
  // }

  // T 泛型 傳啥進來就啥型別

  GetFireObject<T>(QueryPath: any): AngularFireObject<T> {
    // console.log('GetFireObject');
    return this._RealtimeDatabase.object(QueryPath);
  }

  GetFireList<T>(QueryPath: any): AngularFireList<T> {
    // console.log('GetFireList');
    return this._RealtimeDatabase.list(QueryPath);
  }

  // Demo 用的 感覺要再多做一層
  GetKeys(QueryPath: string) {
    // console.log('GetKeys');
    let _Responce: AngularFireList<any> = this._RealtimeDatabase.list(QueryPath)
    return _Responce.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  // https://stackoverflow.com/questions/49847624/array-of-operators-for-a-firestore-query
  // 'sampleCollection', ['foo', '>', 0], ['foo', '<', 10]

  // this._AngularFirestore.collection('Task', ref => ref.where('Tags', 'array-contains-any', ['未處理']).orderBy('EndDate')

  GetFireCollection<T>(QueryPath: string, ...queries: any[]): AngularFirestoreCollection<T> {
    // console.log('GetFireCollection');
    // console.log('QueryPath', QueryPath, 'queries', queries);
    const collection = this._CloudFirestore.collection<T>(QueryPath, ref => {
      // reduce() https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
      return queries.reduce((accumulator, query) => {
        const [fieldPath, opString, value, orderBy1] = query;
        // console.log('orderBy1', orderBy1);
        return accumulator.where(fieldPath, opString as WhereFilterOp, value).orderBy(orderBy1);
      }, ref);
    });

    return collection;
  }

  //   let _QueryFn: QueryFn<DocumentData> | any = ref => ref.where(_FQ.field, _FQ.operator, _FQ.value);
  // return this._CloudFirestore.collection<T>(QueryPath, _QueryFn);

  GetFireDocument<T>(QueryPath: string): AngularFirestoreDocument<T> {
    // console.log('GetFireDocument', QueryPath);
    return this._CloudFirestore.doc<T>(QueryPath);
  }
}
