import { TestBed } from '@angular/core/testing';

import { SignInImgStickerHelperService } from './sign-in-img-sticker-helper.service';

describe('SignInImgStickerHelperService', () => {
  let service: SignInImgStickerHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInImgStickerHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
