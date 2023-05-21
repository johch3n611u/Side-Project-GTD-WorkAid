import { AppleTemplateComponent } from './pages/onstage-pages/components/layout/apple-template/apple-template.component';
import { EditorMdComponent } from './pages/backstage-pages/components/layout/editor-md/editor-md.component';
// 參考
// 路由帶參數 https://medium.com/chikuwa-tech-study/angular-%E7%AC%AC9%E8%AA%B2-%E8%B7%AF%E7%94%B1%E6%94%9C%E5%B8%B6%E5%8F%83%E6%95%B8-39a4d4f05448

import { OrganizeComponent } from './pages/backstage-pages/getting-things-done/components/organize/organize.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/backstage-pages/account/pages/sign-in/sign-in.component';
import { DashboardComponent } from './pages/backstage-pages/components/layout/dashboard/dashboard.component';
import { AuthGuard } from './shared/Guards/auth-guard/auth.guard';
import { JumpAwayGuardGuard } from './shared/Guards/jump-away-guard/jump-away-guard.guard';
import { environment } from '../environments/environment';
import { EditorComponent } from './pages/backstage-pages/example/editor-fail/editor.component';
import { EditorTabComponent } from './pages/backstage-pages/components/layout/editor-tab/editor-tab.component';
import { UsefulLinksTreeComponent } from './pages/backstage-pages/components/layout/useful-links-tree/useful-links-tree.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BackstageHomeComponent } from './pages/backstage-pages/backstage-home/backstage-home.component';
import { OnstageHomeComponent } from './pages/onstage-pages/onstage-home/onstage-home.component';
import { ArticleCatalogComponent } from './pages/onstage-pages/article-catalog/article-catalog.component';
import { NewsArticleComponent } from './pages/onstage-pages/article-template/news-article/news-article.component';

let routes: Routes = RouterHandler();
// console.log(routes); environment.production
function RouterHandler() {
  // 之前還沒 AutoSignIn時可以寫 if 判斷 return 不同 router
  return [
    {
      path: '',
      component: AppleTemplateComponent,
      children: [
        {
          path: '', component: OnstageHomeComponent
        },
        {
          path: 'articlecatalog', component: ArticleCatalogComponent
        },
        {
          path: 'newsarticle/Key/:Key', component: NewsArticleComponent
        },
        {
          path: '404', component: NotFoundComponent // https://stackoverflow.com/questions/36260839/angular-2-how-to-redirect-to-404-or-other-path-if-the-path-does-not-exist
        }
      ]
    },
    {
      path: 'SignIn',
      component: SignInComponent// SignInComponent // UsefulLinksTreeComponent
    },
    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      canDeactivate: [JumpAwayGuardGuard], // 跳出時
      component: DashboardComponent,
      children: [
        { path: '', component: BackstageHomeComponent },
        {
          path: 'pages', // 實際頁面
          loadChildren: () => import('./pages/pages-routing.module')
            .then(mod => mod.PagesRoutingModule)
        },
        {
          path: 'example', // 功能範例
          loadChildren: () => import('./pages/backstage-pages/example/example-routing.module')
            .then(mod => mod.ExampleRoutingModule)
        },
        {
          path: 'template', // 單純版型
          loadChildren: () => import('./pages/backstage-pages/template/template-routing.module')
            .then(mod => mod.TemplateRoutingModule)
        }
      ]
    },
    {
      path: '**',
      redirectTo: '404',
      pathMatch: 'full'
    }
  ];

}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
