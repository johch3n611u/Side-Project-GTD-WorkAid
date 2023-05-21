import { Component, Input, OnInit } from '@angular/core';
import { FireStorageHelperService } from 'src/app/shared/common/fire-storage-helper/fire-storage-helper.service';
import { SnackBarHelperService } from 'src/app/shared/common/snack-bar-helper/snack-bar-helper.service';

@Component({
  selector: 'app-image-hosting-tab',
  templateUrl: './image-hosting-tab.component.html',
  styleUrls: ['./image-hosting-tab.component.css']
})
export class ImageHostingTabComponent implements OnInit {

  @Input() Title: string;
  DisplayMode: string = 'Close';
  EditorMode: string = "ImgSource";

  constructor(
    private _FireStorageHelper: FireStorageHelperService,
    private _SnackBarHelper: SnackBarHelperService,
  ) { }

  ngOnInit(): void {
    // console.log('Title', this.Title);
    if (this.Title == undefined) {
      this.Title = '圖庫元件';
    }
    this.InitGallery();
  }

  EditorModeChange() {
    // console.log('EditorMode', this.EditorMode);
    switch (this.EditorMode) {
      case 'Imgur':
        break;
      case 'GoogleCloud':
        break;
      case 'FirebaseStorage':
        break;
      default:
        console.log(`this.EditorMode`, this.EditorMode);
    }
  }

  NowOnlineGallery: any;

  InitGallery() {

    let ResponseTags = this._FireStorageHelper.GetFireObject('Gallery');

    let _Subscribe: any = ResponseTags.valueChanges().subscribe((elements: any) => {
      _Subscribe.unsubscribe();
      // console.log('elements', elements);
      this.NowOnlineGallery = JSON.parse(elements) || [];
    });
  }

  CopyUrl(val: string) {
    // 複製到剪貼簿 https://www.coder.work/article/1176969
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this._SnackBarHelper.OpenSnackBar(val + ' 已複製到剪貼簿!!');
  }

  Delete(Index: number, Url: string) {
    if (confirm('確定要刪除此照片?' + Url)) {
      this.NowOnlineGallery.splice(Index, 1);
      let ResponseTags = this._FireStorageHelper.GetFireObject('Gallery');
      let _Subscribe: any = ResponseTags.valueChanges().subscribe((elements: any) => {
        _Subscribe.unsubscribe();
        ResponseTags.set(JSON.stringify(this.NowOnlineGallery));
        this._SnackBarHelper.OpenSnackBar('刪除成功!!');
      });
    }
  }
}
