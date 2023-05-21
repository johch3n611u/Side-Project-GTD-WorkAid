import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDataGetStaticJsonComponent } from './shared-data-get-static-json.component';

describe('SharedDataGetStaticJsonComponent', () => {
  let component: SharedDataGetStaticJsonComponent;
  let fixture: ComponentFixture<SharedDataGetStaticJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedDataGetStaticJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDataGetStaticJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
