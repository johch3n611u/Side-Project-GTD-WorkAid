import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface TreeDates {
  NickName: string;
  Url: string;
  Children: Array<TreeDates>;
}

declare var $: any;

@Component({
  selector: 'app-directorytree-mgmt',
  templateUrl: './directorytree-mgmt.component.html',
  styleUrls: ['./directorytree-mgmt.component.css']
})
export class DirectorytreeMgmtComponent implements OnInit {


  @Input() Title: string;
  DisplayMode: string = 'Close';

  constructor() {
    // console.log(this.ArticleDirectory);
  }

  NickName: string = "";
  Url: string = "";
  IsEdited: boolean = false;

  ngOnInit(): void {

    (this.Title == "" || this.Title == undefined) ? this.Title = "目錄管理" : this.Title = this.Title;

    // console.log(this.ArticleDirectory);
  }

  Create(Index: any) {
    console.log('this.ArticleDirectory', this.ArticleDirectory);
    // console.log('Index', typeof (Index));
    // console.log('Index', Index);

    if (this.NickName == "") {
      alert('NickName 必填');
      return;
    }

    let WaitParseString: any;
    if (Index != '' && typeof (Index) != 'number') {

      let IndexArray: Array<string> = Index.split('.');
      // console.log('IndexArray', IndexArray.length);
      // "0", "1", "0", "0" this.TreeDate[0].Children[1].Children[0].push()

      IndexArray.forEach((value: string, index: number, array: string[]) => {
        // console.log('ForEach Index', index);
        if (index == 0) {
          WaitParseString = `this.ArticleDirectory[${value}]`;
        }
        else if (index == IndexArray.length - 1) {
          WaitParseString += `.Children[${value}].Children`;
        } else {
          WaitParseString += `.Children[${value}]`;
        }
      });

    } else {
      if (typeof (Index) != 'number') {
        WaitParseString = `this.ArticleDirectory`;
      } else {
        WaitParseString = `this.ArticleDirectory[${Index}].Children`;
      }
    }

    console.log('WaitParseString', WaitParseString);
    console.log(eval(WaitParseString));

    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval
    let ParsedArray = eval(WaitParseString);

    ParsedArray.push({
      NickName: this.NickName, Url: this.Url, Children: []
    });

    this.NickName = "";
    this.Url = "";
  }

  Delete(Index: any) {
    if (!confirm(`確定要刪除 ${Index} ?`)) {
      return;
    }

    // console.log('Index', Index);
    // console.log(typeof (Index));

    let WaitParseString: any;
    let DeleteIndex: any;

    if (typeof (Index) == 'string') {

      // console.log('Index', Index);
      // console.log(typeof (Index));

      let IndexArray: Array<string> = Index.split('.');
      // console.log('IndexArray', IndexArray.length);
      // "0", "1", "0", "0" this.TreeDate[0].Children[1].Children[0].push()

      IndexArray.forEach((value: string, index: number, array: string[]) => {
        // console.log('ForEach Index', index);
        if (index == 0) {
          WaitParseString = `this.ArticleDirectory[${value}]`;
        }
        else if (index == IndexArray.length - 1) {
          WaitParseString += `.Children`;
          DeleteIndex = value;
        } else {
          WaitParseString += `.Children[${value}]`;
        }
      });

    } else {
      WaitParseString = `this.ArticleDirectory`;
      DeleteIndex = Index;
    }

    // console.log('WaitParseString', WaitParseString);
    // console.log(eval(WaitParseString));

    let ParsedString = eval(WaitParseString);
    // console.log('DeleteIndex', DeleteIndex);
    ParsedString.splice(DeleteIndex);
  }

  Update(Index: any) {
    if (!confirm(`確定要改為 NickName = ${this.NickName} ,Url = ${this.Url} ?`)) {
      return;
    }
    // console.log(Index);
    // console.log(typeof (Index));

    let WaitParseString: any;
    if (Index != '' && typeof (Index) != 'number') {
      // console.log('1');

      let IndexArray: Array<string> = Index.split('.');
      // console.log('IndexArray', IndexArray.length);
      // "0", "1", "0", "0" this.TreeDate[0].Children[1].Children[0].push()

      IndexArray.forEach((value: string, index: number, array: string[]) => {
        // console.log('ForEach Index', index);
        if (index == 0) {
          WaitParseString = `this.ArticleDirectory[${value}]`;
        }
        else {
          WaitParseString += `.Children[${value}]`;
        }
      });

    } else {
      // console.log('2');
      // console.log(typeof (Index))
      WaitParseString = `this.ArticleDirectory[${Index}]`;
    }

    // console.log('WaitParseString', WaitParseString);
    // console.log(eval(WaitParseString));

    let ParsedString = eval(WaitParseString);
    ParsedString.NickName = this.NickName;
    ParsedString.Url = this.Url;
  }

  // https://stackoverflow.com/questions/57769026/input-property-is-not-being-updated-second-time
  @Input() ArticleDirectory: Array<TreeDates> = [] as Array<TreeDates>;
  @Output() onDirectorytreeChange: EventEmitter<any> = new EventEmitter<any>(); // 发射器
  DirectorytreeEmitter() {
    this.onDirectorytreeChange.emit(this.ArticleDirectory);
  }

}
