import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareServiceComponent } from './share-service.component';

describe('ShareServiceComponent', () => {
  let component: ShareServiceComponent;
  let fixture: ComponentFixture<ShareServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
