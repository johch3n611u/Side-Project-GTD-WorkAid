// 參考
// 此為失敗案例待日後再來研究 directive 的寫法
// <div id="md" appEditorMd[editormdConfig] = "conf"(onEditorChange) = "syncModel($event)" >
// <textarea style="display: block;"[(ngModel)] = "markdown" > </textarea></div>
// 外層同步属性内容
// syncModel(str): void {
//   this.markdown = str;
// }

import { AfterViewInit, Attribute, Directive, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { EditorConfig } from './editor-md-config';

declare var editormd: any;
declare var $: any;
@Directive({
  selector: '[appEditorMd]'
})
export class EditorMdDirective implements AfterViewInit {

  @Input() editormdConfig: EditorConfig; // 配置选项
  @Output() onEditorChange: EventEmitter<string> = new EventEmitter<string>(); // 发射器
  editor: any; // editormd编辑器

  constructor(
    @Attribute('id') private id: string
  ) {
  }

  OnInit(): void {
  }

  ngAfterViewInit(): void {
    // https://gitee.com/imlxp/ngx-editor.md-markdown/issues/IHX59
    // https://github.com/pandao/editor.md/issues/553
    // https://www.itread01.com/content/1547506459.html
    // https://gitee.com/imlxp/ngx-editor.md-markdown/tree/master

    // ngx-editor.md-markdown // node_modules/editor.md/css/editormd.css // node_modules/editor.md/editormd.min.js
    // src/assets/editor.md/editormd.min.js // src/assets/editor.md/css/editormd.css

    // console.log('editorlength', $('#' + this.id).length);
    if ($('#' + this.id).length > 0) {
      console.log('editormd');
      this.editor = editormd(this.id, this.editormdConfig); // 创建编辑器
      // console.log('editormd', editormd);

      const out = this.onEditorChange;
      const textarea = $('#' + this.id + ' :first'); // 获取textarea元素

      // console.log('textarea', textarea.length);

      // 当编辑器内容改变时，触发textarea的change事件
      this.editor.on('change', function () {
        out.emit(textarea.val());
      });
    }
  }
}
