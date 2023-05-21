import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTextComponent } from './goal-text.component';

describe('GoalTextComponent', () => {
  let component: GoalTextComponent;
  let fixture: ComponentFixture<GoalTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
