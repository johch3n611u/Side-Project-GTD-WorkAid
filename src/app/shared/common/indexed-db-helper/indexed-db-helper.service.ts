// 參考
// https://dotblogs.com.tw/shadow/2019/10/31/140527
// https://ithelp.ithome.com.tw/articles/10160292
// typescript indexeddb https://visualstudiomagazine.com/articles/2016/09/01/working-with-indexeddb.aspx

// 總結 ts 實作 indexeddb 有點麻煩，改回原來 sessionStorage 方式 auth

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbHelperService {

  _indexedDB: IDBFactory;
  _IDBTransaction: {
    new(): IDBTransaction;
    prototype: IDBTransaction;
  };
  _IDBOpenDBRequest: IDBOpenDBRequest;
  _DBName: string;

  constructor() {
    this._indexedDB = window.indexedDB; //|| window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    this._IDBTransaction = window.IDBTransaction; // || window.webkitIDBTransaction;
    this._DBName = "";
    this._IDBOpenDBRequest = indexedDB.open(this._DBName)
    this._indexedDB.deleteDatabase("");
  }

  OpenIndexedDB(DBName: string): IDBOpenDBRequest {
    this._DBName = DBName;
    this._IDBOpenDBRequest = indexedDB.open(this._DBName)
    return this._IDBOpenDBRequest;
  }

  //   req.onsuccess = function (e) {
  //     console.log("open");
  //     db = e.target.result;
  // };

  // req.onerror = function () {
  //     console.log("error");
  // };

  // req.onupgradeneeded = function (e) {
  //     console.log("upgradeneeded");

  //     var db = e.target.result;
  //     var emp = { id: 1, name: "ray" };
  //     var store = db.createObjectStore("employees", { keyPath: "id" });

  //     store.add(emp);
  // }

  // function addObj() {
  //     var txn = db.transaction("employees", "readwrite");
  //     var store = txn.objectStore("employees");

  //     var emp2 = { id: 2, name: "vivid" };

  //     var req = store.add(emp2);
  //     req.onsuccess = function (e) {
  //         console.log("add");
  //     }

  //     req.onerror = function () {
  //         console.log("error");
  //     };
  // }

  // function getObj() {
  //     var txn = db.transaction("employees", "readwrite");
  //     var store = txn.objectStore("employees");

  //     var req = store.get(2);

  //     req.onsuccess = function (e) {
  //         console.log("get");

  //         var emp = e.target.result;
  //         document.getElementById("result").innerHTML =
  //             emp.id + ", " + emp.name;
  //     }

  //     req.onerror = function () {
  //         console.log("error");
  //     };
  // }

  // function deleteObj() {
  //     var txn = db.transaction("employees", "readwrite");
  //     var store = txn.objectStore("employees");

  //     var req = store.delete(1);

  //     req.onsuccess = function (e) {
  //         console.log("delete");
  //     }

  //     req.onerror = function () {
  //         console.log("error");
  //     };
  // }

  // function updateObj() {
  //     var txn = db.transaction("employees", "readwrite");
  //     var store = txn.objectStore("employees");

  //     var emp2 = { id: 2, name: "kevin" };

  //     var req = store.put(emp2);
  //     req.onsuccess = function (e) {
  //         console.log("put");
  //     }

  //     req.onerror = function () {
  //         console.log("error");
  //     };
  // }
}
