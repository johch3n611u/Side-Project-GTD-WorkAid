import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedAngularMaterialModule } from '../../../shared/module/angular-material.module';
import { CardComponent } from './card/card.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [HomeComponent, CardComponent, GridComponent],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    SharedAngularMaterialModule,
  ]
})
export class TemplateModule { }
