import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-useful-links-tree',
  templateUrl: './useful-links-tree.component.html',
  styleUrls: ['./useful-links-tree.component.css']
})
export class UsefulLinksTreeComponent implements OnInit {

  TreeData: any = [
    {
      NickName: '程式資源', Url: '', Children: [
        {
          NickName: '程式碼參考', Url: 'https//google.com.tw', Children: [

          ]
        }, {
          NickName: '免費圖庫', Url: '', Children: [
            {
              NickName: '圖', Url: 'https//google.com.tw', Children: [

              ]
            }, {
              NickName: '庫', Url: 'https//google.com.tw', Children: [

              ]
            }
          ]
        }, {
          NickName: '架構參考', Url: '', Children: [

          ]
        }
      ]
    },
    {
      NickName: '行銷資源', Url: '', Children: [

      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
