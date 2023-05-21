import { SignInImgStickerHelperService } from './shared/common/sign-in-img-sticker-helper/sign-in-img-sticker-helper.service';
//參考
// beforeunload https://segmentfault.com/a/1190000022905212

import { HostListener, Component } from '@angular/core';
import UserInfoLog from './shared/models/user-info-log';
import * as dayjs from 'dayjs';
import { EnumSignInInfoState } from './shared/enum/enum-user-info-log-state';
import { FireStorageHelperService } from './shared/common/fire-storage-helper/fire-storage-helper.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'studio-backstage';

  _UserInfoLog: UserInfoLog = { State: "", Time: "", Token: "", Email: "" };
  _EnumSignInInfoState = EnumSignInInfoState;

  constructor(
    private _AngularFireAuth: AngularFireAuth,
    private _FireStorageHelper: FireStorageHelperService,
    private _SignInImgStickerHelper: SignInImgStickerHelperService,
  ) {
  }

  @HostListener('window:beforeunload') BeforeunloadHandler(event: any) {

    // console.log(window.event)
    // console.log(event)
    // let Email = sessionStorage.getItem('Email');

    // // beforeunload 關閉頁簽前
    // // unload 關閉頁簽

    // if (Email != null) {
    //   this._UserInfoLog.Email = Email;
    //   this._UserInfoLog.Time = dayjs().format('dddd, MMMM D, YYYY h:mm A');
    //   this._UserInfoLog.Token = sessionStorage.getItem('AuthToken');
    //   this._UserInfoLog.State = this._EnumSignInInfoState.SignOut;
    //   let Reference: any = this._FireStorageHelper.GetFireList('UserInfoLog').push(this._UserInfoLog);
    //   //sessionStorage.clear(); 無法控在 reflash 時清空，所以留給瀏覽器自己清空
    //   this._AngularFireAuth.signOut();
    // }

    // console.log('signOut');

    // // (event || window.event).returnValue = "";

    // console.log('returnValue');

    // 登出大頭貼
    let Email = sessionStorage.getItem('Email');
    if (Email != null) {
      this._SignInImgStickerHelper.Ofline([Email]);
    }
  }

}


