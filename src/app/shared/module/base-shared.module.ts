// 參考
// dayjs 中文 https://day.js.org/docs/en/installation/typescript

// disqus
// https://stackoverflow.com/questions/36102556/is-this-the-right-way-to-embed-disqus-in-angular2-component
// https://murhafsousli.github.io/ngx-disqus/

import { CommonModule, JsonPipe } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PrettyJsonModule } from 'angular2-prettyjson';

import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import 'dayjs/locale/zh-tw' // import locale

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from 'ng2-ckeditor';
import { EditorMdDirective } from '../../pages/backstage-pages/example/editor-md-directive-fail/editor-md.directive';
import { DisqusModule } from 'ngx-disqus';

@NgModule({
  declarations: [
  ],
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    DisqusModule,
    DisqusModule.forRoot('johch3n6-11u'),
  ],
  exports: [
    PrettyJsonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    DisqusModule,
  ]
})
export class BaseSharedModule {

  constructor(
  ) {
    dayjs.extend(isLeapYear) // use plugin
    dayjs.locale('zh-tw') // use locale
  }

  // 加入forRoot，這裡未來會放一些只會在app.module建立的service
  // 因為我們這個module會多次注入，如果你直接在上面寫providers(注入service)，
  // 會產生多個service實體，這不是我們要的，因此我們會把service包裝在forRoot方法中
  // 用30天深入Angular 5的世界 https://ithelp.ithome.com.tw/articles/10195338

  static forRoot(): ModuleWithProviders<BaseSharedModule> {
    return {
      ngModule: BaseSharedModule,
      providers: [
        // 放service
      ]
    };
  }

  // 陣列移除特定元素
  // https://www.mdeditor.tw/pl/25m4/zh-tw

  // var colors = ["red", "blue", "grey"];
  // colors.forEach(function (item, index, arr) {
  //   if (item === "red") {
  //     arr.splice(index, 1);
  //   }
  // });

  //   var colors = ["red", "blue", "grey"];
  // colors = colors.filter(function (item) {
  //   return item != "red"
  // });
}
