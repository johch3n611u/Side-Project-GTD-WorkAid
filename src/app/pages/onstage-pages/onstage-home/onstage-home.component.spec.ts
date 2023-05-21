import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnstageHomeComponent } from './onstage-home.component';

describe('OnstageHomeComponent', () => {
  let component: OnstageHomeComponent;
  let fixture: ComponentFixture<OnstageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnstageHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnstageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
