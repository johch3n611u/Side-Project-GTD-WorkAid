import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackstageHomeComponent } from './backstage-home.component';

describe('BackstageHomeComponent', () => {
  let component: BackstageHomeComponent;
  let fixture: ComponentFixture<BackstageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackstageHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackstageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
