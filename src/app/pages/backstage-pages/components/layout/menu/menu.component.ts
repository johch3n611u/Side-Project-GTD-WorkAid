import { SignInImgStickerHelperService } from './../../../../../shared/common/sign-in-img-sticker-helper/sign-in-img-sticker-helper.service';
import { Component, OnInit } from '@angular/core';
import { FireAuthHelperService } from '../../../../../shared/common/fire-auth-helper/fire-auth-helper.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(
    public _FireAuthHelper: FireAuthHelperService,
    private _SignInImgStickerHelper: SignInImgStickerHelperService,
    private _Router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  Checking() {
    let SignInState = this._FireAuthHelper.GetSignInState();
    SignInState.subscribe(x => {
      console.log('SignInState', x);
    })
  }
  SignOutImg() {
    let Email = sessionStorage.getItem('Email');
    console.log('Email', Email);
    if (Email != null) {
      this._SignInImgStickerHelper.Ofline([Email]);
    }
  }
  BackFrontHomePage() {
    this._Router.navigate(['/']);
  }
}
