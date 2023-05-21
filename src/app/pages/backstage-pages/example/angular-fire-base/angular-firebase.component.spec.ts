import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFirebaseComponent } from './angular-firebase.component';

describe('DemoAngularFireBaseComponent', () => {
  let component: AngularFirebaseComponent;
  let fixture: ComponentFixture<AngularFirebaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularFirebaseComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
