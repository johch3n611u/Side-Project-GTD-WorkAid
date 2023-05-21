import { TestBed } from '@angular/core/testing';

import { TagsHelperService } from './tags-helper.service';

describe('TagsHelperService', () => {
  let service: TagsHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
