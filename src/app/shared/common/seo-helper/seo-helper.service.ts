import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class SeoHelperService {

  // 參考 https://medium.com/@abdelrhman.elgreatly/angular-single-page-app-seo-friendly-using-rendertron-24592fa731b6

  constructor(
    private _Meta: Meta
  ) { }

  GenerateTags(config: any) {
    // default values
    config = {
      title: 'Angular <3 Linkbots',
      description: 'My SEO friendly Angular Component',
      image: 'https://example.com/images/logo.png',
      slug: '',
      ...config
    }

    this._Meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this._Meta.updateTag({ name: 'twitter:site', content: '@content' });
    this._Meta.updateTag({ name: 'twitter:title', content: config.title });
    this._Meta.updateTag({ name: 'twitter:description', content: config.description });
    this._Meta.updateTag({ name: 'twitter:image', content: config.image });
    this._Meta.updateTag({ property: 'og:type', content: 'article' });
    this._Meta.updateTag({ property: 'og:site_name', content: 'content' });
    this._Meta.updateTag({ property: 'og:title', content: config.title });
    this._Meta.updateTag({ property: 'og:description', content: config.description });
    this._Meta.updateTag({ property: 'og:image', content: config.image });
    this._Meta.updateTag({ property: 'og:url', content: `https://www.example.com/${config.slug}` });
  }
}
