import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorytreeMgmtComponent } from '../components/layout/directorytree-mgmt/directorytree-mgmt.component';
import { EditorMdComponent } from '../components/layout/editor-md/editor-md.component';
import { EditorTabComponent } from '../components/layout/editor-tab/editor-tab.component';
import { GetStartedComponent } from '../components/layout/get-started/get-started.component';
import { ImageHostingTabComponent } from '../components/layout/image-hosting-tab/image-hosting-tab.component';
import { AngularFirebaseComponent } from './angular-fire-base/angular-firebase.component';
import { DataTableComponent } from './data-table/data-table.component';
import { EditorComponent } from './editor-fail/editor.component';
import { ShareServiceComponent } from './share-service/share-service.component';
import { SharedDataGetStaticJsonComponent } from './shared-data-get-static-json/shared-data-get-static-json.component';

const routes: Routes = [
  { path: 'angularfirebase', component: AngularFirebaseComponent },
  { path: 'shareservice', component: ShareServiceComponent },
  { path: 'editorfail', component: EditorComponent },
  { path: 'editormd', component: EditorMdComponent },
  { path: 'editortab', component: EditorTabComponent },
  { path: 'imagehostingtab', component: ImageHostingTabComponent },
  { path: 'getstarted', component: GetStartedComponent },
  { path: 'datatable', component: DataTableComponent },
  { path: 'directorytreemgmt', component: DirectorytreeMgmtComponent },
  { path: 'shareddatagetstaticjson', component: SharedDataGetStaticJsonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule { }
