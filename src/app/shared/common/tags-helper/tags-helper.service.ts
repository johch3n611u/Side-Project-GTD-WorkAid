import { Injectable } from '@angular/core';
import { FireStorageHelperService } from '../fire-storage-helper/fire-storage-helper.service';
import { SnackBarHelperService } from '../snack-bar-helper/snack-bar-helper.service';

@Injectable({
  providedIn: 'root'
})
export class TagsHelperService {

  constructor(
    private _FireStorageHelper: FireStorageHelperService,
    private _SnackBarHelper: SnackBarHelperService,
  ) { }

  ReSetTags(NewAddTags: any) {
    // console.log('NewAddTags', NewAddTags);
    if (NewAddTags.length > 0) {
      let ResponseTags = this._FireStorageHelper.GetFireObject('SystemInfo');
      let _Subscribe: any = ResponseTags.valueChanges().subscribe((elements: any) => {
        let NowTags = JSON.parse(elements) || [];
        let FilterTags = NowTags.filter(
          (element: any) => {
            return (NewAddTags.indexOf(element) == -1);
          }
        );
        // 不重複的
        NewAddTags.forEach((x: any) => {
          FilterTags.unshift(x);
        });
        _Subscribe.unsubscribe();
        // console.log('FilterTags', FilterTags);
        ResponseTags.set(JSON.stringify(FilterTags));
        // this._SnackBarHelper.OpenSnackBar('操作成功!');
      });
    }
  }

  // 需要自己 JSON.parse(element)
  GetTagsSubscribe() {
    return this._FireStorageHelper.GetFireObject('SystemInfo').valueChanges();
  }
}
