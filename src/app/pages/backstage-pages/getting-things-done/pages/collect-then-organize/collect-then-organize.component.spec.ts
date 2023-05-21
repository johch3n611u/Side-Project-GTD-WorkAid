import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectThenOrganizeComponent } from './collect-then-organize.component';

describe('CollectThenOrganizeComponent', () => {
  let component: CollectThenOrganizeComponent;
  let fixture: ComponentFixture<CollectThenOrganizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectThenOrganizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectThenOrganizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
