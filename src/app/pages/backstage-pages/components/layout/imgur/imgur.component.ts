import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FireStorageHelperService } from 'src/app/shared/common/fire-storage-helper/fire-storage-helper.service';
import { SnackBarHelperService } from 'src/app/shared/common/snack-bar-helper/snack-bar-helper.service';

@Component({
  selector: 'app-imgur',
  templateUrl: './imgur.component.html',
  styleUrls: ['./imgur.component.css']
})
export class ImgurComponent implements OnInit {

  // https://ittone.ma/ittone/javascript-unable-to-upload-to-imgur-when-using-localhost/
  // 超級無敵大坑，乎Imgur可能會限制直接從本地主機訪問映像，相同程式碼上 github page 就成功了

  constructor(
    protected _HttpClient: HttpClient, // https://stackoverflow.com/questions/47236963/no-provider-for-httpclient
    protected _DomSanitizer: DomSanitizer,
    protected _FireStorageHelper: FireStorageHelperService,
    private _SnackBarHelper: SnackBarHelperService,
  ) { }

  ngOnInit(

  ): void {
  }

  ImgObject: any = {};

  ImgFileChange(Event: any) {
    // console.log(Event);
    if (Event.target.files.length > 0) {
      this.ImgObject.ImgFile = Event.target.files[0]; // input type="file" 的值
      this.ImgObject.ImgFile.name; // input的圖檔名稱
      this.ImgObject.ImgFileSize = Math.floor(this.ImgObject.ImgFile.size * 0.001) + 'KB'; // input的圖片大小
      this.ImgObject.ImgFileThumbnail = this._DomSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.ImgObject.ImgFile)); // input的圖片縮圖
      // console.log(this.ImgObject);
    }
  }

  async UploadImgur() {

    if (this.ImgObject.ImgFile != undefined) {

      const Url = "https://api.imgur.com/3/image";
      let _FormData = new FormData();
      _FormData.append('image', this.ImgObject.ImgFile, this.ImgObject.ImgFile.name);

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Client-ID da1c8b3de4e1e95',
          'accept': '*/*'
        }),
      };

      var Subscribe = this._HttpClient.post(Url, _FormData, httpOptions).subscribe((observer: any) => {
        console.log('observer', observer);
        if (observer.data.link != undefined) {
          Subscribe.unsubscribe();

          console.log('observer.data.link', observer.data.link);
          let ResponseTags = this._FireStorageHelper.GetFireObject('Gallery');
          let _Subscribe: any = ResponseTags.valueChanges().subscribe((elements: any) => {
            _Subscribe.unsubscribe();

            let NowOnlineGallery = JSON.parse(elements) || [];
            NowOnlineGallery.push(observer.data.link);
            ResponseTags.set(JSON.stringify(NowOnlineGallery));
            this._SnackBarHelper.OpenSnackBar('儲存成功!網址為' + observer.data.link);
          });
        }
      });

    }
  }

}
