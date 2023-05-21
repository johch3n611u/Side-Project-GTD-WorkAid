import { TestBed } from '@angular/core/testing';

import { FireStorageHelperService } from './fire-storage-helper.service';

describe('HttpHelperService', () => {
  let service: FireStorageHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireStorageHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
