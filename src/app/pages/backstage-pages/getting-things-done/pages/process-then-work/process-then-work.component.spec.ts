import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessThenWorkComponent } from './process-then-work.component';

describe('ProcessThenWorkComponent', () => {
  let component: ProcessThenWorkComponent;
  let fixture: ComponentFixture<ProcessThenWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessThenWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessThenWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
