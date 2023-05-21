// 參考
// https://blog.csdn.net/weixin_39762348/article/details/111806435
// https://ithelp.ithome.com.tw/articles/10208829

import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import UserInfoLog from '../../../shared/models/user-info-log';
import * as dayjs from 'dayjs';
import { EnumSignInInfoState } from '../../../shared/enum/enum-user-info-log-state';
import { FireStorageHelperService } from '../../../shared/common/fire-storage-helper/fire-storage-helper.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class JumpAwayGuardGuard implements CanDeactivate<unknown> {

  _UserInfoLog: UserInfoLog = { State: "", Time: "", Token: "", Email: "" };
  _EnumSignInInfoState = EnumSignInInfoState;

  constructor(
    private _FireStorageHelper: FireStorageHelperService,
    private _AngularFireAuth: AngularFireAuth,
  ) { }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let Email = sessionStorage.getItem('Email');

    // console.log('Email', Email);

    if (Email != null) {
      this._UserInfoLog.Email = Email;
      this._UserInfoLog.Time = dayjs().format('dddd, MMMM D, YYYY h:mm A');
      this._UserInfoLog.Token = sessionStorage.getItem('AuthToken');
      this._UserInfoLog.State = this._EnumSignInInfoState.SignOut;
      let Reference: any = this._FireStorageHelper.GetFireList('UserInfoLog').push(this._UserInfoLog);
      // sessionStorage.clear();
      // localStorage.clear();
      this._AngularFireAuth.signOut();
    }
    return true;
  }

}
