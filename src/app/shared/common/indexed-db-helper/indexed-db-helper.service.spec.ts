import { TestBed } from '@angular/core/testing';

import { IndexedDbHelperService } from './indexed-db-helper.service';

describe('IndexedDbHelperService', () => {
  let service: IndexedDbHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedDbHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
