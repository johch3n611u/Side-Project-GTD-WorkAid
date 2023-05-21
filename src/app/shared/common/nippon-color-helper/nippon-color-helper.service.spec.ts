import { TestBed } from '@angular/core/testing';

import { NipponColorHelperService } from './nippon-color-helper.service';

describe('GetNipponColorHelperService', () => {
  let service: NipponColorHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NipponColorHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
