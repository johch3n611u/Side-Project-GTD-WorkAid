# Studio Backstage

* 2023-0521 [firebase api key rule](https://ithelp.ithome.com.tw/questions/10204590)
* 2021-1012 color sinper
* 2021-0614 reduced site bounce rate
* 2021-0530 GSAP landing page
* 2021-0427 photo gallery
* 2021-0224 此處改為紀錄大章節，細節內容直接註解紀錄於程式碼內，從無到有的後台專案
* 2021-0223 error handler
* 2021-0215 file architecture / base config / shard module

## 架構

### 打開 VSCode 搭配左邊資料格式觀看 :

其餘 > 多為設定檔，需要時才修改。

src > : 主要 AG app 檔案，包含測試、SPA 唯一那頁、etc...

src > assets : 放置靜態檔案 e.g. 別人的 lib、圖片、etc...

src > env... : 環境變數，供給設定檔之類的使用。

src > app : 程序都在這裡面，首先看到的是 app 開頭的檔案，這些是這個 app 的根元件、根模組、根路由。

src > app > components > : 整個 app 可能會共用的原件、範例都放置於此，而個別系統會用到的元件則放置在個別資料夾內層。

src > app > shared > : 整個 app 可能會共用的函式或引用的庫資源，都會放置於此方便共用，這裡比較特殊需要中階 angular 懂 service、pipe、etc... 才知道怎麼用。

src > app > pages > : 個別元件皆以系統或頁面分類，所有的更改多發生在此資料夾內。

## 參考

[Angular Firebase 入門與實做](https://ithelp.ithome.com.tw/m/users/20104952/ironman/1554) => 結合 firebase

[Angular 深入淺出三十天](https://ithelp.ithome.com.tw/articles/10208267?sc=rss.qu) => 基礎有實作可參考

[Angular Material完全攻略](https://ithelp.ithome.com.tw/articles/10193505) => 別人做的元件應用

[用30天深入Angular 5的世界](https://ithelp.ithome.com.tw/users/20107113/ironman/1240)

[Angular 大師之路](https://ithelp.ithome.com.tw/users/20020617/ironman/1630) => 更細節的內容

[打通 RxJS 任督二脈](https://ithelp.ithome.com.tw/users/20020617/ironman/2959) => 更更細節的內容

[高效 Coding 術：Angular Schematics 實戰三十天](https://ithelp.ithome.com.tw/users/20090728/ironman/2149) => 更更更細節的內容

[material.io](https://material.io/resources/icons/) => 參考

---

* 說明：有 ctrl 為快捷鍵 / 無則是指令

## 終端機指令&快捷鍵

`ctrl + ~` 開啟終端機

`ctrl + c` 終止程序

`cls` 清除屏幕上的所有显示

`cd 位址` 移動終端機至該位址執行

## Node 相關應用

[開發環境安裝](https://ithelp.ithome.com.tw/articles/10238321) 待補 Dock 方式搞定開發環境

[NPM、NVM 簡介](https://ithelp.ithome.com.tw/articles/10230877)

安裝 [nvm for windows](https://github.com/coreybutler/nvm-windows/releases) 或用其他方法安裝

`nvm` 查詢 nvm 版本與相關指令

~~`nvm ls-remote` 察看可用的 node 版本~~

1.1.7 window nvm 版本沒提供這個指令，所以需要到官網去找最新的 [lts (Long-term support)](https://zh.wikipedia.org/wiki/%E9%95%B7%E6%9C%9F%E6%94%AF%E6%8F%B4) 版本...

`nvm install 版本號` 安裝指定版本的 nodejs

`nvm ls` 查詢當前安裝了哪些 nodejs 版本

`nvm use 版本號` 使用該 nodejs 版本

`node -v` 查詢當前使用的 nodejs 版本

`npm install npm -g` 更新 npm

[npm 更新錯誤處理](https://dotblogs.com.tw/explooosion/2018/04/25/035943)

[npm 指令](https://dca.gitbooks.io/nodejs-tw-wiki-book/content/book/node_npm/node_npm.html)

[npm 常用指令](http://dreamerslab.com/blog/tw/npm-basic-commands/)

[Node 詳解](https://titangene.github.io/article/nvm.html)

## Angular 相關指令

1. 安裝 [Will 保哥的 VSCode AG 延伸模組](https://marketplace.visualstudio.com/items?itemName=doggy8088.angular-extension-pack)，開發上會比較舒服，
   安裝保哥套件後不一定要用 cli 指令，也可以右鍵新增 Component

2. `npm install -g @angular/cli` 安裝全域 AG cli

3. `ng new 專案名稱 --routing` 新增一個包含前端 router 的專案

   [新增專案基礎](https://www.cnblogs.com/fz17/p/14065521.html)

4. 新增 `.gitignore` 排除不需要版控的檔案 搜尋 `angular gitignore`

5. 待補 eslint github 星星比較多但改過去太麻煩了，日後再研究一下差異

6. 參考 PrimeNG 專案的架構與 [TrilonIO](https://github.com/TrilonIO/aspnetcore-angular-universal) ，開資料夾備用

7. 前端 Router 設定，參考 [AG 深入淺出](https://ithelp.ithome.com.tw/users/20090728/ironman/1600)，感覺這蠻好的，最後還拿六腳電商網來用 AG 套版，感覺可以給劉愷熟悉下。

   設定半天想把 Components 統一到 Module 再匯入到 Router 內使用，但好像不能這樣用似乎是要用 RouterChird 來管控，

8. 新增登入頁與儀表板 Component，[命名規則參考](https://www.zhihu.com/question/20330840)

## Angular Firebase

9. Auth 新增完後，先接續 firebase 套件，設定部分就不詳紀錄了，需要回看在參考[Firebase Side Project](https://github.com/johch3n611u/Side-Project-Firebase-to-WebDatabase)

10. `npm i -g npm-check-updates` 這個套件不太確定需不需要，先記錄著

11. 將 firebase config 加到 environment 變數中

11. `npm i @angular/fire` 安裝 firebase AG2 套件

12. 開發測試需求先記錄改為全部權限

```json
  {
  "rules": {
    ".read": "true",
    ".write": "auth != null"
  }
}
```

13. firebase module 跟 真正使用要 import 的類別是不同的

14. tsconfig.json 加入 BasePath ts compiler build 會更方便，但此處不想太複雜不取用

15. 建立 firebasehelper 共用 Service 涉及到一些 rxjs

16. `npm install angular2-prettyjson` 利用 angular2-prettyjson 讓 json 在畫面上更值觀

17. 接著搞 fire auth / sign in / router etc...

18. 完成 UserInfoLog 寫入成功

19. `npm i -g angular-cli-ghpages` 成功 repo 到 github page，build 完，執行此套件指令，檔案放到另外一個專案 push 就好

21. 包版指令 `npx ngh --dir=dist/PROJECT_NAME --no-silent` 後來發現是 root 沒設好，還是刪除套件

22. angular 偵測按鈕，登入 enter

23. 完成 UserInfoLog 顯示

24. SignOut

25. 公司使用開源專案 ... 感覺超好用，但感覺會變成學到的東西變少，等熟一點在把後台搬過去。 [ngx-admin](https://github.com/akveo/ngx-admin) / [ngrx](https://ngrx.io/)

26. [ng2-ckeditor](https://www.npmjs.com/package/ng2-ckeditor)

27. 20210314 - RWD & GTD 大致上完成

28. 富文本改為元件 [editor.md](https://github.com/pandao/editor.md) 本來打算用 ck　編輯器的　ｍｋ　套件，但太難搞了後續再弄，先繼續弄這個後來找到的

29. 手動串接套件坑太多了，後續引用的這個 efitor.md 首先是資源引入上的問題就卡了三天，後來搞定後又被渲染生命週期與 mat tab 衝到 ... 只好用手刻 tab 的方案，留下失敗的程式碼後續追蹤

30. 新增文章，[參考1](https://ithelp.ithome.com.tw/articles/10206354)、[參考2](https://www.oxxostudio.tw/articles/201907/firebase-firestore-rules.html)、[參考3](https://stackoverflow.com/questions/46590155/firestore-permission-denied-missing-or-insufficient-permissions)更改了 firebase 權限，雖然格式跟 Task 類似但分開路徑，Task 只有擁有帳號才可以 read、write，而文章則任何人都可以 read，遇到權限錯誤看半天，結果是設定完要重登...

## Angular Material

[AG Material 完全攻略](https://ithelp.ithome.com.tw/articles/10192517)

1. `npm install --save @angular/material @angular/cdk` 在此目錄安裝 AG material

2. `npm install --save @angular/animations` 安裝 Angular Material 動畫套件 ( 需要 import )

3. `npm install --save web-animations-js` 支援其他瀏覽器的轉譯套件

   src/pollyills.ts 取消 import 'web-animations-js' 註解

4. 建立 Material 的 SharedModule 方便取用 Component

5. `npm install --save hammerjs` 安裝手勢支援套件

6. index.html 增加 Material Icons `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
