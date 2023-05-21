import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [],
  exports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ]
})
export class SharedAngularFireModule { }
