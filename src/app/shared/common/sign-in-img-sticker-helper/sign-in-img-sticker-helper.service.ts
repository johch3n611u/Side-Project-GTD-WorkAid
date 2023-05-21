import { Injectable } from '@angular/core';
import { FireStorageHelperService } from '../fire-storage-helper/fire-storage-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SignInImgStickerHelperService {

  constructor(
    private _FireStorageHelper: FireStorageHelperService,
  ) { }

  Online(UserInfo: any) {
    // console.log('NewAddTags', NewAddTags);
    if (UserInfo.length > 0) {
      let ResponseTags = this._FireStorageHelper.GetFireObject('OnlineUsers');
      let _Subscribe: any = ResponseTags.valueChanges().subscribe((elements: any) => {
        let NowTags = JSON.parse(elements) || [];
        let FilterTags = NowTags.filter(
          (element: any) => {
            return (UserInfo.indexOf(element) == -1);
          }
        );
        // 不重複的
        UserInfo.forEach((x: any) => {
          FilterTags.unshift(x);
        });
        _Subscribe.unsubscribe();
        // console.log('Online', FilterTags);
        ResponseTags.set(JSON.stringify(FilterTags));
        // this._SnackBarHelper.OpenSnackBar('操作成功!');
      });
    }
  }

  Ofline(UserInfo: any) {
    // console.log('NewAddTags', NewAddTags);
    if (UserInfo.length > 0) {
      let ResponseTags = this._FireStorageHelper.GetFireObject('OnlineUsers');
      let _Subscribe: any = ResponseTags.valueChanges().subscribe((elements: any) => {
        let NowTags = JSON.parse(elements) || [];
        let FilterTags = NowTags.filter(
          (element: any) => {
            return (UserInfo.indexOf(element) == -1);
          }
        );

        _Subscribe.unsubscribe();
        // console.log('Ofline', FilterTags);
        ResponseTags.set(JSON.stringify(FilterTags));
        // this._SnackBarHelper.OpenSnackBar('操作成功!');
      });
    }
  }
}
