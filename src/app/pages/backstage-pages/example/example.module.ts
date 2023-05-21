import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule } from './example-routing.module';
import { BaseSharedModule } from '../../../shared/module/base-shared.module';

import { AngularFirebaseComponent } from './angular-fire-base/angular-firebase.component';
import { ShareServiceComponent } from './share-service/share-service.component';
import { DataTableComponent } from './data-table/data-table.component';
import { SharedAngularMaterialModule } from 'src/app/shared/module/angular-material.module';

@NgModule({
  declarations: [
    AngularFirebaseComponent,
    ShareServiceComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    ExampleRoutingModule,
    BaseSharedModule,
    SharedAngularMaterialModule,
  ],
  exports: [
    AngularFirebaseComponent
  ]
})
export class ExampleModule { }
