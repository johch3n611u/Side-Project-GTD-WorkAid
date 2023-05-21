import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AppleTemplateComponent } from './apple-template/apple-template.component';
import { SharedAngularMaterialModule } from 'src/app/shared/module/angular-material.module';
import { BaseSharedModule } from 'src/app/shared/module/base-shared.module';
import { FireStorageHelperService } from 'src/app/shared/common/fire-storage-helper/fire-storage-helper.service';
import { FooterComponent } from './apple-template/footer/footer.component';
import { HeaderComponent } from './apple-template/header/header.component';
import { DirectoryNavigationComponent } from './directory-navigation/directory-navigation.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppleTemplateComponent,
    FooterComponent,
    HeaderComponent,
    DirectoryNavigationComponent,
    CarouselComponent,
  ],
  providers: [
    FireStorageHelperService,
  ],
  imports: [
    CommonModule,
    SharedAngularMaterialModule,
    BaseSharedModule,
    LayoutRoutingModule,
    NgbModule
  ],
  exports: [
    DirectoryNavigationComponent,
    AppleTemplateComponent,
    NgbModule,
    CarouselComponent,
  ]
})
export class OnStageLayoutModule { }
