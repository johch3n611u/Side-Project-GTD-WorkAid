import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageHostingTabComponent } from './image-hosting-tab.component';

describe('ImageHostingTabComponent', () => {
  let component: ImageHostingTabComponent;
  let fixture: ComponentFixture<ImageHostingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageHostingTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageHostingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
