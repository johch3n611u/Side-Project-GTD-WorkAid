import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TreeDates } from 'src/app/pages/backstage-pages/components/layout/directorytree-mgmt/directorytree-mgmt.component';

@Component({
  selector: 'app-directory-navigation [ArticleDirectory]',
  templateUrl: './directory-navigation.component.html',
  styleUrls: ['./directory-navigation.component.css']
})
export class DirectoryNavigationComponent implements OnInit {

  @Input() ArticleDirectory: Array<TreeDates> | undefined = [] as Array<TreeDates>;

  constructor(
    _Router: Router,
  ) {
    // 參考 https://stackoverflow.com/questions/36101756/angular2-routing-with-hashtag-to-page-anchor
    _Router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = _Router.parseUrl(_Router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }


  ngOnInit(): void {
  }

}
