import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NipponColorHelperService } from 'src/app/shared/common/nippon-color-helper/nippon-color-helper.service';

@Component({
  selector: 'app-shared-data-get-static-json',
  templateUrl: './shared-data-get-static-json.component.html',
  styleUrls: ['./shared-data-get-static-json.component.css']
})
export class SharedDataGetStaticJsonComponent implements OnInit {

  constructor(
    private NipponColorHelper: NipponColorHelperService,
    protected _HttpClient: HttpClient,
  ) { }

  Color = [] as string[];

  ngOnInit(): void {

    this.TurnColor();

  }

  TurnColor() {
    var Subscribe = this._HttpClient.
      get<any>(
        './assets/nippon-colors.json').subscribe(res => {
          let RandomColors = this.NipponColorHelper.GetNipponColors(res);
          this.NipponColorHelper.SetNipponColorsInit(RandomColors);
          this.NipponColorHelper.SharedNipponColors.subscribe(res => this.Color = res);
          Subscribe.unsubscribe();
        });
  }
}
