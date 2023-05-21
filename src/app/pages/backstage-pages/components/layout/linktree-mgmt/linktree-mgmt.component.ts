import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linktree-mgmt',
  templateUrl: './linktree-mgmt.component.html',
  styleUrls: ['./linktree-mgmt.component.css']
})
export class LinktreeMgmtComponent implements OnInit {

  TreeDate = [
    {
      NickName: '程式', Url: '', Children: [
        {
          NickName: 'Vue3基礎', Url: 'https://book.vue.tw/CH1/1-1-introduction.html', Children: [

          ]
        },
        {
          NickName: 'Vue3API', Url: 'https://uu9924079.medium.com/vue-composition-api-%E7%AD%86%E8%A8%98-%E4%B8%8A-d60eabe3f469', Children: [
            {
              NickName: '行銷', Url: '', Children: [
                {
                  NickName: 'SEO概念', Url: 'https://www.newscan.com.tw/all-seo/seo-guide.htm#', Children: [

                  ]
                },
                {
                  NickName: 'AG SEO', Url: 'https://medium.com/geekculture/seo-in-angular-without-server-side-rendering-fa7d984dd44b', Children: [
                    {
                      NickName: '行銷', Url: '', Children: [
                        {
                          NickName: 'SEO概念', Url: 'https://www.newscan.com.tw/all-seo/seo-guide.htm#', Children: [

                          ]
                        },
                        {
                          NickName: 'AG SEO', Url: 'https://medium.com/geekculture/seo-in-angular-without-server-side-rendering-fa7d984dd44b', Children: [
                            {
                              NickName: '行銷', Url: '', Children: [
                                {
                                  NickName: 'SEO概念', Url: 'https://www.newscan.com.tw/all-seo/seo-guide.htm#', Children: [

                                  ]
                                },
                                {
                                  NickName: 'AG SEO', Url: 'https://medium.com/geekculture/seo-in-angular-without-server-side-rendering-fa7d984dd44b', Children: [

                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }, {
              NickName: '行銷', Url: '', Children: [
                {
                  NickName: 'SEO概念', Url: 'https://www.newscan.com.tw/all-seo/seo-guide.htm#', Children: [

                  ]
                },
                {
                  NickName: 'AG SEO', Url: 'https://medium.com/geekculture/seo-in-angular-without-server-side-rendering-fa7d984dd44b', Children: [

                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      NickName: '行銷', Url: '', Children: [
        {
          NickName: 'SEO概念', Url: 'https://www.newscan.com.tw/all-seo/seo-guide.htm#', Children: [

          ]
        },
        {
          NickName: 'AG SEO', Url: 'https://medium.com/geekculture/seo-in-angular-without-server-side-rendering-fa7d984dd44b', Children: [

          ]
        }
      ]
    },
    {
      NickName: '業務', Url: '', Children: [

      ]
    }
  ];

  NickName: string = "";
  Url: string = "";

  constructor() {
  }

  IsEdited: boolean = false;

  ngOnInit(): void {
    this.DataInit();
  }

  DataInit() {

  }

  Create(Index: any) {
    // console.log('Index', typeof (Index));
    // console.log('Index', Index);

    if (this.NickName == "") {
      alert('NickName 必填');
      return;
    }

    let WaitParseString: any;
    if (typeof (Index) == 'string') {

      let IndexArray: Array<string> = Index.split('.');
      // console.log('IndexArray', IndexArray.length);
      // "0", "1", "0", "0" this.TreeDate[0].Children[1].Children[0].push()

      IndexArray.forEach((value: string, index: number, array: string[]) => {
        // console.log('index', index);
        if (index == 0) {
          WaitParseString = `this.TreeDate[${value}]`;
        }
        else if (index == IndexArray.length - 1) {
          WaitParseString += `.Children[${value}].Children`;
        } else {
          WaitParseString += `.Children[${value}]`;
        }
      });

    } else {
      WaitParseString = `this.TreeDate`;
    }

    // console.log('WaitParseString', WaitParseString);
    // console.log(eval(WaitParseString));

    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval
    let ParsedArray = eval(WaitParseString);

    ParsedArray.push({
      NickName: this.NickName, Url: this.Url, Children: []
    });

    this.NickName = "";
    this.Url = "";
  }

  Update() {

  }

  Delete() {

  }

}
