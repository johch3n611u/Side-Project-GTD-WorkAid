import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryNavigationComponent } from './directory-navigation.component';

describe('DirectoryNavigationComponent', () => {
  let component: DirectoryNavigationComponent;
  let fixture: ComponentFixture<DirectoryNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
