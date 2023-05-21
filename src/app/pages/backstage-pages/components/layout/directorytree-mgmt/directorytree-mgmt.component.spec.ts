import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorytreeMgmtComponent } from './directorytree-mgmt.component';

describe('DirectorytreeMgmtComponent', () => {
  let component: DirectorytreeMgmtComponent;
  let fixture: ComponentFixture<DirectorytreeMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorytreeMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorytreeMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
