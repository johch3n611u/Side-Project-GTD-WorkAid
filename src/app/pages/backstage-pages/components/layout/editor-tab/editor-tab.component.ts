import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';

declare var $: any;

@Component({
  selector: 'app-editor-tab',
  templateUrl: './editor-tab.component.html',
  styleUrls: ['./editor-tab.component.css']
})
export class EditorTabComponent implements OnInit {

  @Input() Title: string;
  DisplayMode: string = 'Open';

  @Input() MarkdownContent: string;
  EditorMode: string;
  @Input() HTMLContent: string;
  @Input() TextContent: string;

  constructor(
    private _ChangeDetectorRef: ChangeDetectorRef // 當有cd發生時觸發
  ) {
    // console.log('EditorTabComponent-HTMLContent', this.HTMLContent);
    // console.log('EditorTabComponent-MarkdownContent', this.MarkdownContent);
  }

  ngOnInit(): void {

    if (this.Title == undefined) {
      this.Title = '請注入此 Component Title';
    }
    this.EditorModeInit();
  }

  EditorModeInit() {
    let LocalStorageEditorMode = localStorage.getItem('EditorMode');
    // console.log('LocalStorageEditorMode', LocalStorageEditorMode);
    if (LocalStorageEditorMode != null) {
      this.EditorMode = LocalStorageEditorMode;
    }
  }

  EditorModeChange() {
    // console.log('EditorMode', this.EditorMode);
    switch (this.EditorMode) {
      case 'Ckeditor':
        this.InitCkeditor();
        break;
      case 'Editor.md':
        break;
      case 'Medium':
        break;
      default:
        console.log(`this.EditorMode`, this.EditorMode);
    }
    // 存至 LocalStorage 記錄使用狀態
    localStorage.setItem('EditorMode', this.EditorMode);
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

      this._ChangeDetectorRef.detectChanges(); // 觸發 AG 變更檢測
    // console.log('ckeditor', this.ckeditor);
  }

  onChange($event: any): void {
    // console.log("onChange");
    //this.log += new Date() + "<br />" ,
    // console.log('this.mycontent', this.ContentHTML)
    let CkText = $('.cke_wysiwyg_div').text();
    // console.log('CkText', CkText);
    this.TextContent = CkText;
    this.ContentEmitter();
  }

  onPaste($event: any): void {
    // console.log("onPaste");
    //this.log += new Date() + "<br />" ;
  }

  // editor.md
  SyncModel(Value: any): void {
    // console.log('Value', Value);
    this.HTMLContent = Value.HTMLContent;
    this.MarkdownContent = Value.MarckContent;
    this.ContentEmitter();
  }

  // 真的使用時
  @Input() Content: string;
  @Output() onCotentChange: EventEmitter<any> = new EventEmitter<any>(); // 发射器
  ContentEmitter() {
    // console.log("ContentEmitter", this.ContentHTML);
    this.onCotentChange.emit({ HTMLContent: this.HTMLContent, MarkdownContent: this.MarkdownContent });
  }
}
