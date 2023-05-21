import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import FirebaseModel from 'src/app/shared/models/firebase-model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { DialogHelperService } from 'src/app/shared/common/dialog-helper/dialog-helper.service';
import { FireStorageHelperService } from 'src/app/shared/common/fire-storage-helper/fire-storage-helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarHelperService } from 'src/app/shared/common/snack-bar-helper/snack-bar-helper.service';
import { MatDialogConfig } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { TagsHelperService } from 'src/app/shared/common/tags-helper/tags-helper.service';
import { TreeDates } from '../../../components/layout/directorytree-mgmt/directorytree-mgmt.component';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {

  DisplayMode: boolean;
  HTMLContent: string;
  MarkdownContent: string;
  _FirebaseModel: FirebaseModel = new FirebaseModel();
  Term: FormGroup;
  Tags: string[] = [];
  _FormControl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  _FilteredTags: Observable<string[]>;
  // allTags: string[] = ['工作室', etc...];
  allTags: string[] = [];

  Key: string
  constructor(
    private _DialogHelper: DialogHelperService,
    private _FireStorageHelper: FireStorageHelperService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _SnackBarHelper: SnackBarHelperService,
    private _TagsHelper: TagsHelperService,
  ) {
    this.Key = this._ActivatedRoute.snapshot.params['key'];
    this._FilteredTags = this._FormControl.valueChanges.pipe(
      startWith(null),
      map((Tag: string | null) => Tag ? this._filter(Tag) : this.allTags.slice()));
    this._FirebaseModel.StartDate = new Date();
  }

  ngOnInit(): void {
    this.TagsInit();
    // console.log('this.Key', this.Key);
    if (this.Key != undefined) {
      this.DataInit();
    }
  }

  SyncEditorModel(Value: any) {
    // console.log('最外層 Value', Value);
    this.HTMLContent = Value.HTMLContent;
    this.MarkdownContent = Value.MarkdownContent;
  }

  remove(Tag: string): void {
    const index = this.Tags.indexOf(Tag);

    if (index >= 0) {
      this.Tags.splice(index, 1);
    }
  }

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

  @ViewChild('TagInput') TagInput: ElementRef<HTMLInputElement>;
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

  CheckFormThenSubmit() {

    if (!confirm('確定要儲存草稿嗎?')) {
      return;
    }

    // 最後決定不卡驗證
    // if (this.FirebaseModel.Content === undefined || this.FirebaseModel.Name === undefined) {
    //   this._MatDialogConfig.data = "必填請務必填寫";
    //   this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
    // } else {
    //   if (this.Key != undefined) {
    //     this.Update();
    //   } else {
    //     this.Add();
    //   }
    // }

    if (this.Key != undefined) {
      this.Update('SubmitButton');
    } else {
      this.Add('SubmitButton');
    }
  }

  DataInit() {
    var _Document = this._FireStorageHelper.GetFireDocument('Article/' + this.Key);
    var Subscribe = _Document.valueChanges().subscribe((Param: any) => {
      console.log('Param', Param);
      Subscribe.unsubscribe();
      this._FirebaseModel = JSON.parse(JSON.stringify(Param));
      this.HTMLContent = Param.Content;
      this.MarkdownContent = Param.MarkdownContent;
      if (Param.ArticleDirectory != undefined) {
        this.ArticleDirectory = Param.ArticleDirectory;
      }
      // console.log('this.ArticleDirectory', this.ArticleDirectory);
      // console.log('Param', Param);
      // console.log('Param.HTMLContent', Param.Content);
      // console.log('this.HTMLContent', this.HTMLContent);
      // console.log('this.MarkdownContent', this.MarkdownContent);

    });
  }

  Add(UploadType: string) {
    this._FirebaseModel.Status = "草稿";
    this._FirebaseModel.Content = this.HTMLContent;
    this._FirebaseModel.MarkdownContent = this.MarkdownContent;
    this._FirebaseModel.Tags = [... new Set(this.Tags)];
    this._FirebaseModel.ArticleDirectory = this.ArticleDirectory;

    this._FirebaseModel.Content = this._FirebaseModel.Content.replaceAll('<a', '<a target="_blank" ');
    // 新增一筆
    // console.log('this.FirebaseModel', this.FirebaseModel);
    let _Collection = this._FireStorageHelper.GetFireCollection<FirebaseModel>('Article');
    let JSONString = JSON.stringify(this._FirebaseModel);
    let Obj = JSON.parse(JSONString);
    // console.log('Obj', Obj);
    var HttpRequest = _Collection.add(Obj).catch(error => {
      this._MatDialogConfig.data = error;
      this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
    }).then(success => {

      let Tags: any = this._FirebaseModel.Tags;
      if (Tags.length > 0) {
        this._TagsHelper.ReSetTags(Tags);
      }

      this._FirebaseModel = new FirebaseModel();
      this.Tags = [];
      this._FirebaseModel.StartDate = new Date();

      this._SnackBarHelper.OpenSnackBar('操作成功!');
      if (UploadType == 'SubmitButton') {
        this._Router.navigate(['dashboard/pages/contentmgmt']);
      }
    });
  }

  Update(UploadType: string) {
    this._FirebaseModel.Status = "草稿";
    this._FirebaseModel.Content = this.HTMLContent;
    this._FirebaseModel.MarkdownContent = this.MarkdownContent;
    this._FirebaseModel.Tags = [... new Set(this.Tags)];
    this._FirebaseModel.ArticleDirectory = this.ArticleDirectory;

    this._FirebaseModel.Content = this._FirebaseModel.Content.replaceAll('<a', '<a target="_blank" ');

    // 更新
    console.log('this.FirebaseModel', this._FirebaseModel);
    var _Document = this._FireStorageHelper.GetFireDocument('Article/' + this.Key);
    // console.log('this.FirebaseModel', this.FirebaseModel);
    let JSONStringUpdate = JSON.stringify(this._FirebaseModel);
    let ObjUpdate = JSON.parse(JSONStringUpdate);
    var _Update = _Document.update(ObjUpdate).catch(error => {
      this._MatDialogConfig.data = error;
      this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
    }).then(success => {
      // this._MatDialogConfig.data = "success";
      // this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
      // this.IsEdit = false;

      let Tags: any = this._FirebaseModel.Tags;
      if (Tags.length > 0) {
        this._TagsHelper.ReSetTags(Tags);
      }

      this._SnackBarHelper.OpenSnackBar('操作成功!');
      if (UploadType == 'SubmitButton') {
        this._Router.navigate(['dashboard/pages/contentmgmt']);
      }

    });
  }

  // 銷毀元件
  ngOnDestroy() {
    console.log('ngOnDestroy');
    // var _SessionStorage = sessionStorage.getItem('Editing');
    // console.log('_SessionStorage', _SessionStorage);
    if (this._FirebaseModel.Status == '編輯中') {
      this._FirebaseModel.Status = '草稿';
      // this.Update('AutoActive');
      this.UpdateStatus();
      // sessionStorage.removeItem('Editing');
    }
  }

  // https://segmentfault.com/a/1190000022905212
  // https://blog.cwlove.idv.tw/js-event-close-tab-browser-beacon-api/
  // 不管在事件函式的哪都會觸發 ...

  @HostListener('window:beforeunload') BeforeunloadHandler(event: any) {

    console.log('beforeunload');

    (event || window.event).returnValue = "必須給值才會彈窗";
    (event || window.event).preventDefault();
    // 这里写关闭时需要处理的时间，刷新也会执行这里的方法
    if (this.Key != undefined) {
      this.Update('AutoActive');
    } else {
      this.Add('AutoActive');
    }

    return '必須給值才會彈窗';

  }

  @HostListener('window:onbeforeunload') onBeforeunloadHandler(event: any) {
    console.log('onbeforeunload');
    (event || window.event).returnValue = "必須給值才會彈窗";
    (event || window.event).preventDefault();
    if (this.Key != undefined) {
      this.Update('AutoActive');
    } else {
      this.Add('AutoActive');
    }
    return '必須給值才會彈窗';

  }

  @HostListener('document:visibilitychange') visibilitychange(event: any) {
    // 給手機板用的日後再搞

    console.log('visibilitychange');

    // if (this.FirebaseModel.Name != undefined) {// 必須要有值才能去存不然會存一堆怪異的空文章
    //   if (this.Key != undefined) {
    //     this.UpdateStatus();
    //   }
    // }

    // (event || window.event).returnValue = "必須給值才會彈窗";
    // (event || window.event).preventDefault();

    // return '必須給值才會彈窗';

  }

  // @HostListener('window:unload') unload(event: any) {

  //   this.Update();

  // }

  TagsInit() {
    var Subscribe = this._TagsHelper.GetTagsSubscribe().subscribe((x: any) => {
      this.allTags = JSON.parse(x);
      Subscribe.unsubscribe();
    });
  }

  UpdateStatus() {

    this._FirebaseModel.Status = "草稿";
    var _Document = this._FireStorageHelper.GetFireDocument('Article/' + this.Key);
    let JSONStringUpdate = JSON.stringify(this._FirebaseModel);
    let ObjUpdate = JSON.parse(JSONStringUpdate);
    var _Update = _Document.update(ObjUpdate).catch(error => {
      this._MatDialogConfig.data = error;
      this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
    }).then(success => {

      let Tags: any = this._FirebaseModel.Tags;
      if (Tags.length > 0) {
        this._TagsHelper.ReSetTags(Tags);
      }

      this._SnackBarHelper.OpenSnackBar('操作成功!');
      this._Router.navigate(['dashboard/pages/contentmgmt']);

    });
  }

  // https://stackoverflow.com/questions/55133907/react-with-typescript-type-is-missing-the-following-properties-from-type
  // 結果這樣就修好了...
  ArticleDirectory: any = [] as Array<TreeDates>;

}
