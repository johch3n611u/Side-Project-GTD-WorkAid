import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FireStorageHelperService } from '../../../../../shared/common/fire-storage-helper/fire-storage-helper.service'
import UserInfoLog from '../../../../../shared/models/user-info-log'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  _UserInfoLog = [] as UserInfoLog[];

  constructor(
    private _FireStorageHelper: FireStorageHelperService
  ) {

    // valueChanges 取出來是過濾掉 key 的 View 可以直接用
    // this._FireStorageHelper.GetFireList('UserInfoLog').valueChanges().subscribe((Data: any) => {
    //   this._UserInfoLog = Data.reverse();
    //   //console.log('this._UserInfoLog', this._UserInfoLog);
    // });

    //console.log('SideNavComponent');
  }

  ngOnInit(): void {
    this.CommonlyUsedInit();
  }

  SideNavLocalStorage: any;

  // 常用功能渲染 SideNav 初始化
  CommonlyUsedInit() {
    let _SideNavTemp = localStorage.getItem('SideNavTemp');
    if (_SideNavTemp != null) {
      this.SideNavLocalStorage = JSON.parse(_SideNavTemp);
      // console.log('this.SideNavLocalStorage', this.SideNavLocalStorage);
      this.SideNavLocalStorage = this.SideNavLocalStorage.splice(0, 3);
      // console.log('this.SideNavLocalStorage', this.SideNavLocalStorage);
    }
  }

  // 存常用功能
  MatAccordionOnClick(Event: any) {
    // console.log('Event', Event);
    // console.log('Event', Event.path[1].href);
    // console.log('Event', Event.target.innerText);
    let _href = Event.path[1].href;
    let _innerText = Event.path[1].innerText;
    if (_href != undefined && _innerText != undefined) {
      // console.log('MatAccordionOnClick');
      this.SideNavEmitter();
      // 取出來篩選掉重複的再存進去
      let SideNavTemp = [];
      let _SideNavTemp = localStorage.getItem('SideNavTemp');
      // console.log('_SideNavTemp', _SideNavTemp);
      if (_SideNavTemp != null) {
        SideNavTemp = JSON.parse(_SideNavTemp) || [];
        let ArrayText = [_innerText];
        SideNavTemp = SideNavTemp.filter((element: any) => {
          return ArrayText.indexOf(element.NickName) == -1
        });
      }

      _href = this.GetUrlRelativePath(_href);

      // console.log('SideNavTemp', SideNavTemp);
      SideNavTemp.unshift({ NickName: _innerText, Url: _href });

      // console.log('SideNavTemp', SideNavTemp);
      let JSONString = JSON.stringify(SideNavTemp);
      localStorage.setItem('SideNavTemp', JSONString);
      // console.log('_SideNavTemp', _SideNavTemp);
    }
    this.CommonlyUsedInit();

  }

  // 擷取相對路徑
  // https://www.itread01.com/p/1439796.html
  GetUrlRelativePath(url: string) {
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略,擷取從start開始到結尾的所有字元

    if (relUrl.indexOf("?") != -1) {
      relUrl = relUrl.split("?")[0];
    }
    return relUrl;
  }

  toggle(event: any) {
    console.log('event', event);
  }

  @Output() onSideNavToggle: EventEmitter<any> = new EventEmitter<any>(); // 发射器
  SideNavEmitter() {
    // console.log('onSideNavToggle');
    this.onSideNavToggle.emit('Toggle');
  }
}
