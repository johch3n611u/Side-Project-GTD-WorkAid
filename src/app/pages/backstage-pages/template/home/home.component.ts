import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  number: number[];

  Rules: string[] = [
    '搜集 : 把任何你需要跟蹤或者記住或者做的事情記在一個收件箱。把你腦子裡的任何東西都拿出來放到你的搜集設備里，準備好做下一步的處理',
    '處理 : 從最上面開始，一次處理一項，不把任何東西放回收件箱，將它組織到代辦事項並給予 Deadline。',
    '組織 : 定義專案內容 ( OKR 大拆小 KPI ) ，擬定下一步行動 ( 動詞 )，讓事情能夠直接走起去做。',
    '檢查 : 隨時保持 Top 5 減少時隨時補上，避免拖延與只做容易的，請按照順序地做列表上的事情。',
    '做事 : 依照 Top 1-5 做就對了。'
  ];

  constructor() {
    this.number = [1, 2, 3, 4, 5];
  }

  ngOnInit(): void {
  }

}
