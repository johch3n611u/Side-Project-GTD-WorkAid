import { TestBed } from '@angular/core/testing';

import { SeoHelperService } from './seo-helper.service';

describe('SeoHelperService', () => {
  let service: SeoHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
