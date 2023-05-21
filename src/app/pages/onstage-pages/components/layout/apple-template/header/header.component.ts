import { Component, Input, OnInit } from '@angular/core';
import { TagsHelperService } from 'src/app/shared/common/tags-helper/tags-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header [RandomColor]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() RandomColor: string;

  constructor(
    private _TagsHelper: TagsHelperService,
    private _Router: Router,
  ) { }

  ngOnInit(): void {
    // this.TagsInit();
  }

  allTags: any;

  TagsInit() {
    var Subscribe = this._TagsHelper.GetTagsSubscribe().subscribe((x: any) => {
      this.allTags = JSON.parse(x);
      Subscribe.unsubscribe();
    });
  }

  IsSearchOpend: boolean = false;

  Navigator(Address: string) {
    let _path = window.location.pathname;
    // ${_path}
    this._Router.navigate([`/`], { fragment: `${Address}` });
    let element = document.querySelector('#' + Address);
    if (element) { element.scrollIntoView(true); } else {
      this.MoveToAnchor(Address);
    }
  }

  MoveToAnchor(Address: string) {
    setTimeout(() => {
      let element = document.querySelector('#' + Address);
      if (element) { element.scrollIntoView(true); } else { this.MoveToAnchor(Address) }
    }, 2000);
  }
}
