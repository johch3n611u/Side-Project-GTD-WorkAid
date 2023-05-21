import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorMdComponent } from './editor-md.component';

describe('EditorMdComponent', () => {
  let component: EditorMdComponent;
  let fixture: ComponentFixture<EditorMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorMdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
