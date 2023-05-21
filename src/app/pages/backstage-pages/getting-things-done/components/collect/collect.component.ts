import { SnackBarHelperService } from 'src/app/shared/common/snack-bar-helper/snack-bar-helper.service';
import { BaseComponent } from 'src/app/pages/backstage-pages/components/base/base.component';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';
import { EnumComponentType } from 'src/app/shared/enum/enum-component-type';
import { TagsHelperService } from 'src/app/shared/common/tags-helper/tags-helper.service';

@Component({
  selector: 'app-collect [ComponentType]',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css']
})
export class CollectComponent extends BaseComponent implements OnInit {

  @Input() ComponentType: EnumComponentType;

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

    super();

    this.TagsInit();

    const Today = new Date();
    const TodayAdd7days = dayjs(Today).add(7, 'day').toDate();

    this.Term = new FormGroup({
      start: new FormControl(Today),
      end: new FormControl(TodayAdd7days)
    });

    // Rxjs 應用 (這裡已經到進階應用了寫完 GTD 再來詳細看) KeyWord AG大師 & Rxjs
    // 這段目的是藉由管道(pipe)排除輸入空白
    // 20210404 後來實作真正的動態 Tag 發現這裡有一段非同步利用到 pipe 的方式，大概是在判斷及時輸入時同步輸入的內容...
    this._FilteredTags = this._FormControl.valueChanges.pipe(
      startWith(null),
      map((parameter: string | null) => parameter ? this._filter(parameter) : this.allFruits.slice()));
  }
  MainTitle: string = "";
  SubTitle: string = "";
  ProcessBtn: string = "";
  Key: string = "";
  ngOnInit(): void {

    this.Key = this._ActivatedRoute.snapshot.params['key'];

    switch (this.ComponentType) {
      case this._EnumComponentType.Untreated:
        this.MainTitle = '蒐集';
        this.SubTitle = '把任何你需要跟蹤或者記住或者做的事情記在一個收件箱。把你腦子裡的任何東西都拿出來放到你的搜集箱，準備好做下一步的處理。';
        this.ProcessBtn = '處理';
        break;
      case this._EnumComponentType.Processed:
        this.MainTitle = '子項目蒐集';
        this.SubTitle = 'OKR 後確保此處都是能夠立即行動的 KPI 動作';
        this.ProcessBtn = '詳細';
        break;
      default:
        console.log(`沒有此 Tag 的表單 ${this.ComponentType}.`);
    }
  }

  // Chips Autocomplete 應用
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // FormControl 應用 https://angular.tw/api/forms/FormControl
  _FormControl = new FormControl();
  // 20210404 後來實作真正的動態 Tag 發現這裡有一段非同步利用到 pipe 的方式，大概是在判斷及時輸入時同步輸入的內容...
  // _FilteredTags: Observable<string[]>; 前端為 mat-option *ngFor="let Tag of _FilteredTags|async" [value]="Tag"
  _FilteredTags: Observable<string[]>;
  Tags: string[] = [];
  // allFruits: string[] = ['工作室',etc...];
  allFruits: string[] = [];

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
    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  _MatDialogConfig: MatDialogConfig = {} as MatDialogConfig;

  CheckFormThenSubmit() {
    this.FirebaseModel.StartDate = this.Term.value.start;
    this.FirebaseModel.EndDate = this.Term.value.end;
    this.FirebaseModel.MainTaskId = this.Key;
    // 去掉重複陣列元素 https://gotraveltoworld.medium.com/js-array-%E5%88%AA%E9%99%A4%E9%87%8D%E8%A4%87%E5%85%83%E7%B4%A0%E7%9A%84%E4%B8%89%E7%A8%AE%E6%96%B9%E5%BC%8F-c79be2d270e6
    this.Tags.push('未處理');
    this.FirebaseModel.Status = "";
    this.FirebaseModel.Tags = [... new Set(this.Tags)];

    // 不卡驗證可填空單
    // if (this.FirebaseModel.Content === undefined || this.FirebaseModel.Name === undefined) {
    //   this._MatDialogConfig.data = "必填請務必填寫";
    //   this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
    // } else {
    // 儲存至 FireStore 之後這裡要多做一層，因為 firebase 只吃無型別資料...
    // Function addDoc() called with invalid data. Data must be an object, but it was: a custom object
    let _Collection = this._FireStorageHelper.GetFireCollection<FirebaseModel>('Task');
    let JSONString = JSON.stringify(this.FirebaseModel);
    let Obj = JSON.parse(JSONString);
    _Collection.add(Obj).catch(error => {
      this._MatDialogConfig.data = error;
      this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
    }).then(success => {
      // this._MatDialogConfig.data = "success";
      // this._DialogHelper.ShowMessage<string>(this._MatDialogConfig);
      // setTimeout(function () { window.location.reload(); }, 3000);

      let Tags: any = this.FirebaseModel.Tags;
      if (Tags.length > 0) {
        this._TagsHelper.ReSetTags(Tags);
      }

      this.FirebaseModel = new FirebaseModel();
      this.Tags = [];
      const Today = new Date();
      const TodayAdd7days = dayjs(Today).add(7, 'day').toDate();
      this.Term = new FormGroup({
        start: new FormControl(Today),
        end: new FormControl(TodayAdd7days)
      });

      this._SnackBarHelper.OpenSnackBar('操作成功!');
    });
    // }
  }

  TagsInit() {
    var Subscribe = this._TagsHelper.GetTagsSubscribe().subscribe((x: any) => {
      this.allFruits = JSON.parse(x);
      Subscribe.unsubscribe();
    });
  }
}

