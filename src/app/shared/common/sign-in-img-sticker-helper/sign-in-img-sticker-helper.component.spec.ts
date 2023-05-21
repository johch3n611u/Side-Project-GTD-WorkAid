import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInImgStickerHelperComponent } from './sign-in-img-sticker-helper.component';

describe('SignInImgStickerHelperComponent', () => {
  let component: SignInImgStickerHelperComponent;
  let fixture: ComponentFixture<SignInImgStickerHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInImgStickerHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInImgStickerHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
