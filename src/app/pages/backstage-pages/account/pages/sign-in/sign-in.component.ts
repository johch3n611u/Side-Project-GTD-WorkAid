// 參考
// mat input ngModel https://stackoverflow.com/questions/49671478/ngmodel-is-not-working-when-an-input-field-is-repeated-with-the-property-inside
// formModule https://stackoverflow.com/questions/38892771/cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-input
// FormControl https://angular.tw/api/forms/FormControlName
// Router https://angular.tw/guide/router#accessing-query-parameters-and-fragments
// sessionStorage https://developer.mozilla.org/zh-TW/docs/Web/API/Window/sessionStorage
// momentjs https://stackoverflow.com/questions/35166168/how-to-use-moment-js-library-in-angular-2-typescript-app
// npm uninstall xx --save https://hsiangfeng.github.io/nodejs/20190626/1317979814/
// dayjs https://www.npmjs.com/package/dayjs
// dayjs 中文 https://www.mdeditor.tw/pl/2Mf3/zh-tw
// 按鈕觸發 https://www.itread01.com/content/1549474753.html

import { Component, OnInit } from '@angular/core';
import { FireAuthHelperService } from '../../../../../shared/common/fire-auth-helper/fire-auth-helper.service';
import { DialogHelperService } from '../../../../../shared/common/dialog-helper/dialog-helper.service';
import { MatDialogConfig } from '@angular/material/dialog';
import SignIn from '../../../../../shared/models/sign-in';
import { Router } from '@angular/router';
import { FireStorageHelperService } from '../../../../../shared/common/fire-storage-helper/fire-storage-helper.service';
import UserInfoLog from '../../../../../shared/models/user-info-log';
import { EnumSignInInfoState } from '../../../../../shared/enum/enum-user-info-log-state';
import * as dayjs from 'dayjs';
import { SnackBarHelperService } from 'src/app/shared/common/snack-bar-helper/snack-bar-helper.service';
import { SignInImgStickerHelperService } from 'src/app/shared/common/sign-in-img-sticker-helper/sign-in-img-sticker-helper.service';
import { HttpClient } from '@angular/common/http';
import { NipponColorHelperService } from 'src/app/shared/common/nippon-color-helper/nippon-color-helper.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  DialogConfig: MatDialogConfig<any> = {};
  SignInState: any | null;
  SignInForm: SignIn = { Email: "", Password: "" };
  RandomColor: string = "";
  _UserInfoLog: UserInfoLog = { State: "", Time: "", Token: "", Email: "" };
  _EnumSignInInfoState = EnumSignInInfoState;

  constructor(
    private _FireAuthHelper: FireAuthHelperService,
    private _DialogHelper: DialogHelperService,
    private _Router: Router,
    private _FireStorageHelper: FireStorageHelperService,
    private _SnackBarHelper: SnackBarHelperService,
    private _SignInImgStickerHelper: SignInImgStickerHelperService,
    private NipponColorHelper: NipponColorHelperService,
  ) {

  }

  ngOnInit(): void {

    // this.RandomColor = this.getRandomColor();
    this._FireAuthHelper.CheckStorage();
    this.AutoSignIn();
    this.NipponColorHelper.SharedNipponColors.subscribe(res => this.RandomColor = res[0]);

  }

  // 帳號密碼登錄
  CommonSignIn(SignModel: string) {
    this._FireAuthHelper.CommonSignIn(this.SignInForm)
      .then((value: any) => {
        // console.log('Success!', value);
        this.SignInForm.Verification = '操作成功!' + value;

        // 將上線資訊新增到 _RealtimeDatabase 用於 Auth Guard 認證
        this._UserInfoLog.Email = value.user.email;
        this._UserInfoLog.Time = dayjs().format('dddd, MMMM D, YYYY h:mm A');
        this._UserInfoLog.Token = value.user.a.c;
        this._UserInfoLog.State = this._EnumSignInInfoState.SignIn;
        let Reference: any = this._FireStorageHelper.GetFireList('UserInfoLog').push(this._UserInfoLog);
        // console.log('Reference', Reference);

        // 將資料存到sessionStorage
        sessionStorage.setItem('Email', value.user.email);
        sessionStorage.setItem('AuthToken', value.user.a.c);
        sessionStorage.setItem('AuthTokenId', Reference.path.pieces_[1]);

        // 將資料儲存到localStorage
        // console.log('SignModel', SignModel);
        if (SignModel == 'ButtonSignIn') {
          this.CheckRememberMe();
        }

        // 在線使用者
        this._SignInImgStickerHelper.Online([value.user.email]);

        // 轉移網址
        this._Router.navigate(['/dashboard/']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.SignInForm.Verification = 'Something went wrong:' + err.message;
      });
  }

  // 隨機取 rgb 字串
  // getRandomColor() {
  //   var rgb = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.4)';
  //   // console.log(rgb);
  //   return rgb;
  // }

  // SignInWithGoogle() {
  //   this._FireAuthHelper.SignInWithGoogle().then(
  //     GoogleInfo => {
  //       //console.log('GoogleInfo', GoogleInfo);
  //       this._FireAuthHelper.GetSignInState().subscribe(UserInfo => {
  //         //console.log('UserInfo', UserInfo);
  //         this.SignInState = UserInfo;
  //         //console.log('this.SignInState', this.SignInState);
  //         //this.DialogConfig.data = JSON.stringify(this.SignInState);
  //         this.DialogConfig.data = this.SignInState;
  //         //console.log('this.DialogConfig.data', this.DialogConfig.data);
  //         this._DialogHelperService.ShowMessage(this.DialogConfig);
  //       });
  //     }
  //   );
  // }

  RememberMe: boolean = false;
  Disabled: boolean = false;

  CheckRememberMe() {
    // 打勾是 true 沒打勾是 false
    // console.log('this.RememberMe', this.RememberMe);

    if (this.RememberMe) { // true 時將帳號密碼存入
      localStorage.setItem("AutoSignIn", JSON.stringify(this.SignInForm));
    } else { // false 時將帳密清空
      localStorage.removeItem("AutoSignIn");
    }

  }

  _MatDialogConfig: MatDialogConfig = {} as MatDialogConfig;

  AutoSignIn() {
    // 如果 localStorage 有值，將值塞入信箱與密碼並執行登入
    let _AutoSignIn: any = localStorage.getItem("AutoSignIn");
    // console.log(_AutoSignIn);
    // 沒有的時候取到 null 會導致 JSON.parse 錯，所以擺 any 但要記得防呆
    if (_AutoSignIn != null) {
      this.Disabled = true;
      this.RememberMe = true;
      this._SnackBarHelper.OpenSnackBar('自動登入中，請稍後!!');
      _AutoSignIn = JSON.parse(_AutoSignIn);
      this.SignInForm.Email = _AutoSignIn.Email;
      this.SignInForm.Password = _AutoSignIn.Password;
      // console.log(_AutoSignIn);
      this.CommonSignIn('AutoSignIn');
    }

  }


}
