import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FireStorageHelperService } from 'src/app/shared/common/fire-storage-helper/fire-storage-helper.service';
import FirebaseModel from 'src/app/shared/models/firebase-model';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit {

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _FireStorageHelper: FireStorageHelperService,
    private _DomSanitizer: DomSanitizer,
  ) { }

  Key: any;
  Article: FirebaseModel = new FirebaseModel;

  ngOnInit(): void {
    this.Key = this._ActivatedRoute.snapshot.paramMap.get('Key');
    console.log('this.Key', this.Key);
    var Observable = this._FireStorageHelper.GetFireDocument('Article/' + this.Key).valueChanges();
    var Subscription = Observable.subscribe((Data: any) => {
      // https://stackoverflow.com/questions/48556861/angular-4-innerhtml-property-removing-id-attribute
      Data.Content = this._DomSanitizer.bypassSecurityTrustHtml(Data.Content);
      this.Article = Data;
      console.log('Data', Data);
      Subscription.unsubscribe();
    });
  }

}
