import { SnackBarHelperService } from 'src/app/shared/common/snack-bar-helper/snack-bar-helper.service';
// 參考
// router 取得參數 https://ithelp.ithome.com.tw/articles/10209035
import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import FirebaseModel from '../../../../../shared/models/firebase-model';
import { FormGroup, FormControl } from '@angular/forms';
import * as dayjs from 'dayjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DialogHelperService } from '../../../../../shared/common/dialog-helper/dialog-helper.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { FireStorageHelperService } from '../../../../../shared/common/fire-storage-helper/fire-storage-helper.service';
import { CKEditorComponent } from 'ng2-ckeditor';
import { Router, ActivatedRoute } from '@angular/router';
import { EnumComponentType } from '../../../../../shared/enum/enum-component-type';
import { TagsHelperService } from 'src/app/shared/common/tags-helper/tags-helper.service';

@Component({
  selector: 'app-organize [TableType]',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.css']
})
export class OrganizeComponent implements OnInit {

  IsEdit: boolean = false;
  FirebaseModel: FirebaseModel = new FirebaseModel();
  Term: FormGroup;

  constructor(
    private _DialogHelper: DialogHelperService,
    private _FireStorageHelper: FireStorageHelperService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _SnackBarHelper: SnackBarHelperService,
    private _TagsHelper: TagsHelperService,
  ) {
    const Today = new Date();
    const TodayAdd7days = dayjs(Today).add(7, 'day').toDate();

    this.Term = new FormGroup({
      start: new FormControl(Today),
      end: new FormControl(TodayAdd7days)
    });

    // Rxjs 應用 (這裡已經到進階應用了寫完 GTD 再來詳細看) KeyWord AG大師 & Rxjs
    // 這段目的是藉由管道(pipe)排除輸入空白
    this._FilteredTags = this._FormControl.valueChanges.pipe(
      startWith(null),
      map((Tag: string | null) => Tag ? this._filter(Tag) : this.allTags.slice()));

  }

  ComponentType: EnumComponentType;
  Key: string
  ngOnInit(): void {
    this.TagsInit();

    this.ComponentType = this._ActivatedRoute.snapshot.params['ComponentType'];
    this.Key = this._ActivatedRoute.snapshot.params['key'];

    this.InitCkeditor();
    // 讀取特定的 docutment
    this.DataInit();
  }

  // Chips Autocomplete 應用
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // FormControl 應用 https://angular.tw/api/forms/FormControl
  _FormControl = new FormControl();
  _FilteredTags: Observable<string[]>;
  Tags: string[] = [];
  // allTags: string[] = ['工作室',etc...];
  allTags: string[] = [];

  // ViewChild 應用參考 https://www.itread01.com/content/1544339826.html
  @ViewChild('TagInput') TagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.Tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this._FormControl.setValue(null);
  }

  remove(Tag: string): void {
    const index = this.Tags.indexOf(Tag);

    if (index >= 0) {
      this.Tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.Tags.push(event.option.viewValue);
    this.TagInput.nativeElement.value = '';
    this._FormControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(Tag => Tag.toLowerCase().indexOf(filterValue) === 0);
  }

  _MatDialogConfig: MatDialogConfig = {} as MatDialogConfig;
  _EnumComponentType = EnumComponentType;

  CheckFormThenSubmit() {

    if (this.ComponentType == this._EnumComponentType.Untreated) {

      if (!confirm('注意，此選項會將未處理狀態改壓已處理!!')) {
        return;
      }
      this.Tags.push('已處理');
      // https://www.mdeditor.tw/pl/25m4/zh-tw
      this.Tags = this.Tags.filter(function (Tag) { return Tag != "未處理" });

    }
    this.FirebaseModel.Status = ''; // 編輯完成清空狀態
    if (this.FirebaseModel.Content === undefined || this.FirebaseModel.Name === undefined) {
      this._MatDialogConfig.data = "必填請務必填寫";
      this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
    } else {
      this.UploadData('SubmitButton');
    }
  }

  UploadData(UploadType: string) {
    this.FirebaseModel.Tags = [... new Set(this.Tags)];
    this.FirebaseModel.StartDate = this.Term.value.start;
    this.FirebaseModel.EndDate = this.Term.value.end;

    // 儲存至 FireStore 之後這裡要多做一層，因為 firebase 只吃無型別資料...
    // Function addDoc() called with invalid data. Data must be an object, but it was: a custom object

    var _Document = this._FireStorageHelper.GetFireDocument('Task/' + this.Key);
    let JSONString = JSON.stringify(this.FirebaseModel);
    let Obj = JSON.parse(JSONString);
    var _Update = _Document.update(Obj).catch(error => {
      this._MatDialogConfig.data = error;
      this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
    }).then(success => {
      // this._MatDialogConfig.data = "success";
      // this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
      // this.IsEdit = false;

      console.log('UploadType', UploadType);

      if (UploadType == 'SubmitButton') {

        let Tags: any = this.FirebaseModel.Tags;
        if (Tags.length > 0) {
          this._TagsHelper.ReSetTags(Tags);
        }

        this._SnackBarHelper.OpenSnackBar('操作成功!');
        this._Router.navigate(['dashboard/pages/processthenwork']);
      }

    });


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
    };
    this.FirebaseModel.Content = `<p>My html content</p>`;
  }

  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
    console.log('this.mycontent', this.FirebaseModel.Content);
    // 打開共同編輯模式才儲存
    if (this.FirebaseModel.Status == '共同編輯中') {
      this.UploadData('OnChange');
    }
  }

  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }

  DataInit() {

    console.log('this.Key', this.Key);

    // https://blog.kevinyang.net/2018/04/30/angular-firebase/
    var _Document = this._FireStorageHelper.GetFireDocument('Task/' + this.Key);
    console.log('_Document', _Document);

    var Subscribe = _Document.valueChanges().subscribe((Param: any) => {
      console.log('Param', Param);

      this.Term = new FormGroup({
        start: new FormControl(Param.StartDate),
        end: new FormControl(Param.EndDate)
      });

      this.FirebaseModel.Content = Param.Content;
      this.FirebaseModel.Name = Param.Name;
      this.FirebaseModel.StartDate = Param.StartDate;
      this.FirebaseModel.EndDate = Param.EndDate;
      this.FirebaseModel.DeadLine = Param.DeadLine;
      this.Tags = Param.Tags;
      this.FirebaseModel.Tags = Param.Tags;
      this.FirebaseModel.MainTaskId = Param.MainTaskId;
      this.FirebaseModel.Status = Param.Status;
      if (Param.Status == '共同編輯中') {
        this.IsCoEditing = true;
      } else {
        this.IsCoEditing = false;
      }

      Subscribe.unsubscribe();
    });



    // 如果是從檢察頁面進入的不直接開啟編輯模式 2021-0324 Issue 直接全部都先進觀看畫面
    // if (this.ComponentType == this._EnumComponentType.Processed) {
    //   this.IsEdit = false;
    // }
  }

  TurnOnEditMode() {
    // 2021-0324 Issue 有人先進入任務詳細頁則用狀態編輯中鎖住頁面不給編輯，除非開啟共同編輯狀態，防止 Firebase 存取爆表
    // 首次進入時確認狀態不是編輯中，否則將狀態改為編輯中，銷毀元件時移除狀態
    if (this.FirebaseModel.Status != '編輯中' && this.FirebaseModel.Status != '共同編輯中') {
      this.IsEdit = true;
      this.FirebaseModel.Status = '編輯中';
      this.UploadData('TurnOnEditModeButton');
      // 同時增加一筆 Session 用來防呆跳出銷毀元件時判別是按下按鈕的人跳開才回復任務狀態
      sessionStorage.setItem('Editing', this.Key);
    }
    if (this.FirebaseModel.Status == '共同編輯中') {
      this.IsEdit = true;
    }
  }

  IsCoEditing: boolean = false;

  CoEditing() {

    if (this.FirebaseModel.Status == '編輯中') {
      this.FirebaseModel.Status = '共同編輯中';
      this.UploadData('TurnOnEditModeButton');
    } else {
      this.FirebaseModel.Status = '編輯中';
      this.UploadData('TurnOnEditModeButton');
    }

  }

  // 銷毀元件
  ngOnDestroy() {

    console.log('ngOnDestroy');

    var _SessionStorage = sessionStorage.getItem('Editing');
    // console.log('_SessionStorage', _SessionStorage);
    if (this.FirebaseModel.Status == '編輯中' && _SessionStorage == this.Key) {
      // this.FirebaseModel.Status = '';
      // this.UploadData('TurnOnEditModeButton');
      this.UpdateStatus();
      sessionStorage.removeItem('Editing');
    }
  }

  // https://segmentfault.com/a/1190000022905212
  // https://blog.cwlove.idv.tw/js-event-close-tab-browser-beacon-api/
  // 不管在事件函式的哪都會觸發 ...
  @HostListener('window:beforeunload') BeforeunloadHandler(event: any) {

    console.log('beforeunload');

    var _SessionStorage = sessionStorage.getItem('Editing');
    if (this.FirebaseModel.Status == '編輯中' && _SessionStorage == this.Key) {
      this.FirebaseModel.Status = '';
      this.UploadData('AutoActive');
    }
    (event || window.event).returnValue = "必須給值才會彈窗";
    (event || window.event).preventDefault();
    // 这里写关闭时需要处理的时间，刷新也会执行这里的方法
    return '必須給值才會彈窗';

  }

  @HostListener('window:onbeforeunload') onBeforeunloadHandler(event: any) {

    console.log('onbeforeunload');

    var _SessionStorage = sessionStorage.getItem('Editing');
    if (this.FirebaseModel.Status == '編輯中' && _SessionStorage == this.Key) {
      this.FirebaseModel.Status = '';
      this.UploadData('AutoActive');
    }
    (event || window.event).returnValue = "必須給值才會彈窗";
    (event || window.event).preventDefault();
    return '必須給值才會彈窗';

  }

  @HostListener('document:visibilitychange') visibilitychange(event: any) {
    // 給手機板用的日後再搞

    console.log('visibilitychange');

    // var _SessionStorage = sessionStorage.getItem('Editing');
    // if (this.FirebaseModel.Status == '編輯中' && _SessionStorage == this.Key) {
    //   this.FirebaseModel.Status = '';
    //   this.UploadData('AutoActive');
    // }
    // (event || window.event).returnValue = "必須給值才會彈窗";
    // (event || window.event).preventDefault();

    // return '必須給值才會彈窗';

  }

  // @HostListener('window:unload') unload(event: any) {

  //   this.FirebaseModel.Status = '';
  //   this.UploadData('ShutDownAutoSave');

  // }

  TagsInit() {
    var Subscribe = this._TagsHelper.GetTagsSubscribe().subscribe((x: any) => {
      this.allTags = JSON.parse(x);
      Subscribe.unsubscribe();
    });
  }

  UpdateStatus() {

    this.FirebaseModel.Status = "";
    var _Document = this._FireStorageHelper.GetFireDocument('Task/' + this.Key);
    let JSONStringUpdate = JSON.stringify(this.FirebaseModel);
    let ObjUpdate = JSON.parse(JSONStringUpdate);
    var _Update = _Document.update(ObjUpdate).catch(error => {
      this._MatDialogConfig.data = error;
      this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
    }).then(success => {

      let Tags: any = this.FirebaseModel.Tags;
      if (Tags.length > 0) {
        this._TagsHelper.ReSetTags(Tags);
      }

      this._SnackBarHelper.OpenSnackBar('操作成功!');
      this._Router.navigate(['dashboard/pages/processthenwork']);

    });
  }
}
