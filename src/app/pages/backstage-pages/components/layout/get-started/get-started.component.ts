import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {

  Title: string = '讓我們開始吧 !!';
  StepName: string;
  StepContent: string;
  AllStep: Array<any> = [];
  StepMode: string = '';

  constructor() { }

  ngOnInit() {
  }

  StepModeChange() {
    console.log('StepMode', this.StepMode);
    switch (this.StepMode) {
      case 'GettingThingDone':
        this.AllStep = [
          {
            StepName: '蒐集 - 清空腦袋思緒，讓想法集中於該做的事上。',
            StepContent: '首先左邊工具欄 > JustDoIt ，利用蒐集將標題、摘要、預計日期、類別，進行快速蒐集。此時如有 " 該做的事請 " 以先解決它為主。'
          },
          {
            StepName: '處理 - 請排定一個較長的時間，將蒐集到的任務進行組織整理成一步步的動作並執行。',
            StepContent: '左邊工具欄 > JustDoIt ，處理表格內蒐集到的任務，點擊處理進行組織任務，如可立即完成請立即完成並封存，發現不必要或能與其他任務進行組合，也請將無用之任務進行刪除。'
          },
          {
            StepName: '組織 - 目的是將任務的所有事情以大化小成能夠直接行動的動詞，利用這些用動詞安排子項目。',
            StepContent: '左邊工具欄 > JustDoIt ，處理表格內點擊處理按鈕，組織窗格將提供富文本，以利任務拆分為 OKR、KPI 的方式，並決定確切的類別，並預計可能的工作時間，工作時間除了對自己與他人能夠了解任務進度外，" 如有預估錯誤也有利於類似項目在後續能夠更精準的預估工時，所以請於封存結案時填寫為確切工時 "。'
          },
          {
            StepName: '檢查 - 檢視與確認目前 Top 5 的行動方案是否適切，並依照狀況進行任務調整。',
            StepContent: '首頁內分為做事 - 看板 Top 5 任務與檢查兩部份，檢查功能提供了更方便的任務調整，能實時根據狀況調整任務內容與進度，如需調整任務請點擊任務工具欄的詳細按鈕，進入詳細頁後開啟編輯模式。'
          },
          {
            StepName: '做事 - 顧名思義就是趕快把上面擬的事情分階段完成。',
            StepContent: '點擊詳細按鈕可以調整任務或查看任務情報。'
          },
        ]
        break;
      default:
        console.log(`this.StepMode, ${this.StepMode}.`);
    }
  }
}
