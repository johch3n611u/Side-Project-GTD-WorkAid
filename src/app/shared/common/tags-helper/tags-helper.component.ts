import { Component, OnInit } from '@angular/core';
import { TagsHelperService } from './tags-helper.service';

@Component({
  selector: 'app-tags-helper',
  templateUrl: './tags-helper.component.html',
  styleUrls: ['./tags-helper.component.css']
})
export class TagsHelperComponent implements OnInit {

  constructor(
    public _TagsHelper: TagsHelperService,
  ) {

  }

  Tags: any;

  ngOnInit(): void {

    // _TagsHelperService 使用範例

    // this._TagsHelperService.ReSetTags(['bbb', 'ccc', 'ddd']);

    // var Subscribe = this._TagsHelperService.GetTagsSubscribe().subscribe((x: any) => {
    //   this.Tags = JSON.parse(x);
    //   console.log('this.Tags', this.Tags);
    //   Subscribe.unsubscribe();
    // });

    var Subscribe = this._TagsHelper.GetTagsSubscribe().subscribe((x: any) => {
      this.Tags = JSON.parse(x);
      // console.log('this.Tags', this.Tags);
      Subscribe.unsubscribe();
    });

  }

  NewTag: string;

  Add() {
    // console.log('NewTag', this.NewTag);
    if (this.NewTag != undefined, this.NewTag.length > 0) {
      this._TagsHelper.ReSetTags([this.NewTag]);
    }
  }

  Delete() {

  }


}
