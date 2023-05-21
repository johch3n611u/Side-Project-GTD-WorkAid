// 參考
// https://stackoverflow.com/questions/39446203/how-to-add-plugins-to-ng2-ckeditor-using-typescript-and-angular-2

import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';
import { EditorConfig } from '../editor-md-directive-fail/editor-md-config';

declare var editormd: any;
declare var $: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  Content: string = "";

  constructor() { }

  ngOnInit(): void {
    this.InitCkeditor();
    // this.EditorMdInit();
  }

  // ng2-ckeditor
  name = 'ng2-ckeditor';
  ckeConfig: CKEDITOR.config;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: CKEditorComponent;

  InitCkeditor() {
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      height: '45vh',
    },
      this.Content = `<p>My html content</p>`;
  }

  onChange($event: any): void {
    console.log("onChange"),
      //this.log += new Date() + "<br />" ,
      console.log('this.mycontent', this.Content)
  }

  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />" ;
  }

  // Editor.md
  // _EditorConfig = new EditorConfig;
  // _EditorMd: any;
  TabIndex: any;

  // EditorMdInit() {
  //   console.log('EditorMd.length', $('#EditorMd'));
  //   console.log('_EditorConfig', this._EditorConfig);
  //   this._EditorMd = editormd('EditorMd', this._EditorConfig);
  // }

  SyncModel(Value: any): void {
    console.log('Value', Value);
    this.Content = Value;
  }
}
