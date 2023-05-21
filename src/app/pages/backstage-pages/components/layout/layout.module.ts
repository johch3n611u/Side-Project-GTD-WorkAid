import { EditorMdComponent } from './editor-md/editor-md.component';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SharedAngularMaterialModule } from '../../../../shared/module/angular-material.module';

import { FireStorageHelperService } from '../../../../shared/common/fire-storage-helper/fire-storage-helper.service';
import { DialogComponent } from './dialog/dialog.component';

import { BaseSharedModule } from '../../../../shared/module/base-shared.module';
import { MenuComponent } from './menu/menu.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { EditorComponent } from '../../example/editor-fail/editor.component';
import { EditorMdDirective } from '../../example/editor-md-directive-fail/editor-md.directive';
import { EditorTabComponent } from './editor-tab/editor-tab.component';
import { ImageHostingTabComponent } from './image-hosting-tab/image-hosting-tab.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { ImgurComponent } from './imgur/imgur.component';
import { UsefulLinksTreeComponent } from './useful-links-tree/useful-links-tree.component';
import { LinktreeMgmtComponent } from './linktree-mgmt/linktree-mgmt.component';
import { SignInImgStickerHelperComponent } from 'src/app/shared/common/sign-in-img-sticker-helper/sign-in-img-sticker-helper.component';
import { DirectorytreeMgmtComponent } from './directorytree-mgmt/directorytree-mgmt.component';
import { SharedDataGetStaticJsonComponent } from '../../example/shared-data-get-static-json/shared-data-get-static-json.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    DialogComponent,
    MenuComponent,
    SnackBarComponent,
    EditorComponent,
    EditorMdDirective,
    EditorMdComponent,
    EditorTabComponent,
    ImageHostingTabComponent,
    GetStartedComponent,
    ImgurComponent,
    UsefulLinksTreeComponent,
    LinktreeMgmtComponent,
    SignInImgStickerHelperComponent,
    DirectorytreeMgmtComponent,
    SharedDataGetStaticJsonComponent,
  ],
  providers: [
    FireStorageHelperService
  ],
  imports: [
    CommonModule,
    SharedAngularMaterialModule,
    BaseSharedModule,
    LayoutRoutingModule,
  ],
  exports: [
    DirectorytreeMgmtComponent,
    DashboardComponent,
    SideNavComponent,
    DialogComponent,
    MenuComponent,
    SnackBarComponent,
    EditorComponent,
    EditorMdDirective,
    EditorMdComponent,
    EditorTabComponent,
    ImageHostingTabComponent,
    GetStartedComponent,
    ImgurComponent,
    UsefulLinksTreeComponent,
    SignInImgStickerHelperComponent,
  ]
})
export class BackStageLayoutModule {
  constructor(
    // @Optional() @SkipSelf() parentModule: BackStageLayoutModule
  ) {
    // 可將這段拉出去建立一個ts檔案，未來需要指注入一次的module都可以使用
    // if (parentModule) {
    //   throw new Error(`LayoutModule 已加載 FirebaseHelperService. 確保單向資料流, 請勿再重複加載避免資料汙染.`);
    // }
  }
}
