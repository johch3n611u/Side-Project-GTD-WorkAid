import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulLinksTreeComponent } from './useful-links-tree.component';

describe('UsefulLinksTreeComponent', () => {
  let component: UsefulLinksTreeComponent;
  let fixture: ComponentFixture<UsefulLinksTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsefulLinksTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsefulLinksTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
