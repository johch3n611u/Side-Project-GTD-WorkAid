import { TestBed } from '@angular/core/testing';

import { FireAuthHelperService } from './fire-auth-helper.service';

describe('FireAuthHelperService', () => {
  let service: FireAuthHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireAuthHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
