import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NipponColorHelperService } from 'src/app/shared/common/nippon-color-helper/nippon-color-helper.service';

@Component({
  selector: 'app-apple-template',
  templateUrl: './apple-template.component.html',
  styleUrls: ['./apple-template.component.css']
})
export class AppleTemplateComponent implements OnInit {

  RandomColor: string;

  constructor(
    private _HttpClient: HttpClient,
    private NipponColorHelper: NipponColorHelperService,
  ) { }

  ngOnInit(): void {
    // this.RandomColor = this.getRandomColor();
    this.TurnColor();
  }

  // 隨機取 rgb 字串
  // getRandomColor() {
  //   var rgb = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.9)';
  //   // console.log(rgb);
  //   return rgb;
  // }

  TurnColor() {
    var Subscribe = this._HttpClient.
      get<any>(
        './assets/nippon-colors.json').subscribe(res => {
          let RandomColors = this.NipponColorHelper.GetNipponColors(res);
          this.NipponColorHelper.SetNipponColorsInit(RandomColors);
          this.NipponColorHelper.SharedNipponColors.subscribe(res => this.RandomColor = res[0]);
          Subscribe.unsubscribe();
        });
  }
}
