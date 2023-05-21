import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleTemplateComponent } from './apple-template.component';

describe('AppleTemplateComponent', () => {
  let component: AppleTemplateComponent;
  let fixture: ComponentFixture<AppleTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppleTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
