import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditorConfig } from '../../../example/editor-md-directive-fail/editor-md-config';

declare var editormd: any;
declare var $: any;

@Component({
  selector: 'app-editor-md',
  templateUrl: './editor-md.component.html',
  styleUrls: ['./editor-md.component.css']
})
export class EditorMdComponent implements OnInit {

  @Output() onEditorMdChange: EventEmitter<any> = new EventEmitter<any>(); // 发射器
  _EditorConfig = new EditorConfig;
  _EditorMd: any;

  @Input() ContentText: string;
  @Input() MarkdownContent: string;

  constructor() {
  }

  ngOnChanges() {
    // if (this.ContentText != undefined) {
    //   $('.editormd-markdown-textarea').val(this.ContentText);
    // }
    // console.log('this.MarkdownContent', this.MarkdownContent);
    if (this.MarkdownContent != undefined) {
      // console.log('this.MarkdownContent',);
      $('.editormd-markdown-textarea').val(this.MarkdownContent)
    }
  }

  ngOnInit(): void {
    // 初始化
    this._EditorMd = editormd('EditorMd', this._EditorConfig);

    // https://codertw.com/ios/21968/
    // console.log('MackdownContent', this.MackdownContent);
    // console.log('this.ContentText', this.ContentText);

    // 如果有 MackdownContent 就壓過去
    if (this.ContentText != undefined) {
      $('.editormd-markdown-textarea').val(this.ContentText);
    }
    if (this.MarkdownContent != undefined) {
      $('.editormd-markdown-textarea').val(this.MarkdownContent);
    }

    // $('.editormd-markdown-textarea').val(this.ContentText); // 左邊輸入框內的 HTML
    // $('.markdown-body').html(this.ContentText);// 右邊顯示編譯好的 HTML
    // this._EditorMd.htmlTextarea.val() // EditorMd 物件內編譯好的 HTML

    // 当编辑器内容改变时，触发textarea的change事件
    let ChangeEvent = this.onEditorMdChange;
    let EditorMd = this._EditorMd;
    this._EditorMd.on('change', function () {
      // console.log('innerHtml', $('.markdown-body').html());
      ChangeEvent.emit(
        { HTMLContent: EditorMd.htmlTextarea.val(), MarckContent: $('.editormd-markdown-textarea').val() }
      );
    });
  }

}
