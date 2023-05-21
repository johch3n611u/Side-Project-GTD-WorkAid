// 參考
// https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
// https://blog.kevinyang.net/2018/04/30/angular-firebase/
// https://ithelp.ithome.com.tw/articles/10194424
// 權限管理 https://ithelp.ithome.com.tw/articles/10206354
// 一般登入 https://alligator.io/angular/firebase-authentication-angularfire2/
// IndexedDB https://developer.mozilla.org/zh-TW/docs/Web/API/IndexedDB_API/Using_IndexedDB
// 關閉視窗事件 https://dotblogs.com.tw/JustinChienCC/2017/05/12/013038
// window close https://forum.angular.tw/t/angular-window-close/234
// window use ag https://stackoverflow.com/questions/42454611/how-can-i-use-a-window-object-in-angular-2

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import SignIn from '../../../shared/models/sign-in';
import { Router } from '@angular/router';
import UserInfoLog from '../../../shared/models/user-info-log';
import * as dayjs from 'dayjs';
import { EnumSignInInfoState } from '../../../shared/enum/enum-user-info-log-state';
import { FireStorageHelperService } from '../../../shared/common/fire-storage-helper/fire-storage-helper.service';

@Injectable({
  providedIn: 'root'
})
export class FireAuthHelperService {

  SignInState: Observable<firebase.User | null>;
  SignInForm: SignIn = { Email: "", Password: "" };
  _UserInfoLog: UserInfoLog = { State: "", Time: "", Token: "", Email: "" };
  _EnumSignInInfoState = EnumSignInInfoState;

  constructor(
    private _AngularFireAuth: AngularFireAuth,
    private _Router: Router,
    private _FireStorageHelper: FireStorageHelperService
  ) {
    this.SignInState = this._AngularFireAuth.authState;

    // console.log('window.onbeforeunload', window.onbeforeunload);

    // window.onbeforeunload = (event: BeforeUnloadEvent) => {
    //   console.log('BeforeUnloadEvent', event);
    // }

    // window.localStorage 永久保存直到被刪除
    // window.sessionStorage 頁面沒被關閉
    // FireAuth 會加一包 IndexedDB 在 local
  }



  // 一般登入
  CommonSignIn(SignInForm: SignIn) {
    return this._AngularFireAuth.signInWithEmailAndPassword(SignInForm.Email, SignInForm.Password);
  }

  // 登出
  SignOut() {
    // 將離線資訊新增到
    this._UserInfoLog.Email = sessionStorage.getItem('Email');
    this._UserInfoLog.Time = dayjs().format('dddd, MMMM D, YYYY h:mm A');
    this._UserInfoLog.Token = sessionStorage.getItem('AuthToken');
    this._UserInfoLog.State = this._EnumSignInInfoState.SignOut;
    let Reference: any = this._FireStorageHelper.GetFireList('UserInfoLog').push(this._UserInfoLog).then(
      () => {
        localStorage.clear();
        sessionStorage.clear();
        this._Router.navigate(['/SignIn']);
        this._AngularFireAuth.signOut();
      }
    );
    ;
  }

  // 取得使用者資訊
  GetSignInState() {
    return this.SignInState;
  }

  // 避免重複狂 call api 如果本地端有值就給過
  CheckStorage() {

    let AuthToken = sessionStorage.getItem('AuthToken');

    if (AuthToken !== undefined || AuthToken !== null || AuthToken !== "") {
      // 轉移網址
      this._Router.navigate(['/dashboard/']);
    }
  }

  // 註冊
  // signup(email: string, password: string) {
  //   this.firebaseAuth
  //     .auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(value => {
  //       console.log('Success!', value);
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:',err.message);
  //     });
  // }

  // 使用 Google 登入
  // SignInWithGoogle() {
  //   return this._AngularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  // }

  // 使用匿名登入
  //  SignInAnonymously() {
  //   return this.afAuth.auth.signInAnonymously()
  //       .then(this.redirectToPopup());
  // }

  // 使用 GitHub 登入
  // SignInWithGithub() {
  //   return this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
  //       .then(this.redirectToPopup());
  // }

}
