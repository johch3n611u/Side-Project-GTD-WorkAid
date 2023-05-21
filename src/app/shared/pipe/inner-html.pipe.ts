// 參考
// https://www.itread01.com/content/1549489340.html

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'html'
})
export class InnerHtmlPipe implements PipeTransform {
  constructor(private _DomSanitizer: DomSanitizer) {
  }
  transform(style: any): unknown {
    return this._DomSanitizer.bypassSecurityTrustHtml(style);
  }

}
