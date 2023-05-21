import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NipponColorHelperService {

  // 參考 https://ithelp.ithome.com.tw/articles/10209906

  constructor(

  ) {

  }

  private NipponColorsContainer = [] as string[];
  private NipponColors = new BehaviorSubject(this.NipponColorsContainer);
  SharedNipponColors = this.NipponColors.asObservable();

  GetNipponColors(NipponColor: any) {

    let RandomColorsIndex = [] as number[];
    let RandomColors = [] as string[];

    // console.log('NipponColor[47]', NipponColor[47]);

    while (RandomColorsIndex.length < 3) {
      let NowNum = this.GetRandom(1, 250);
      if (RandomColorsIndex.indexOf(NowNum) == -1) {
        // console.log('NowNum', NowNum);
        RandomColorsIndex.push(NowNum);
        RandomColors.push(NipponColor[NowNum].value);
      }
    }

    return RandomColors;
  }

  GetRandom(Min: number, Max: number) {
    return Math.floor(Math.random() * (Max - Min + 1)) + Min;
  };

  SetNipponColorsInit(RandomColors: any) {
    // 當資料變更時，在呼叫 next() 方法，通知所有訂閱的來源更新
    this.NipponColors.next(RandomColors);
  }
}
