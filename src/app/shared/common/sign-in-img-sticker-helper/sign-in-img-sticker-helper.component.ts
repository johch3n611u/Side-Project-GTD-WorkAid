import { FireStorageHelperService } from 'src/app/shared/common/fire-storage-helper/fire-storage-helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in-img-sticker-helper',
  templateUrl: './sign-in-img-sticker-helper.component.html',
  styleUrls: ['./sign-in-img-sticker-helper.component.css']
})
export class SignInImgStickerHelperComponent implements OnInit {

  constructor(
    private _FireStorageHelper: FireStorageHelperService,
  ) { }

  OnlineUsers: any = [];

  ngOnInit(): void {
    let Subscribe = this._FireStorageHelper.GetFireObject('OnlineUsers').valueChanges().subscribe((x: any) => {

      let Temp = JSON.parse(x);

      Temp.forEach((element: any) => {
        this.OnlineUsers.push({ User: element, Color: this.getRandomColor() });
      });

      // this.OnlineUsers = JSON.parse(x);
      // console.log('this.OnlineUsers', this.OnlineUsers);
      // Subscribe.unsubscribe();
    });
  }

  FakeAlt: string = "Hided";

  mouseEnter(div: string) {
    // console.log("mouse enter : " + div);
    this.FakeAlt = "Actived";
  }

  mouseLeave(div: string) {
    // console.log('mouse leave :' + div);
    this.FakeAlt = "Hided";
  }

  // 隨機取 rgb 字串
  getRandomColor() {
    var rgb = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
    // console.log(rgb);
    return rgb;
  }
}
