import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinktreeMgmtComponent } from './linktree-mgmt.component';

describe('LinktreeMgmtComponent', () => {
  let component: LinktreeMgmtComponent;
  let fixture: ComponentFixture<LinktreeMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinktreeMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinktreeMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
