import { TestBed } from '@angular/core/testing';

import { JumpAwayGuardGuard } from './jump-away-guard.guard';

describe('JumpAwayGuardGuard', () => {
  let guard: JumpAwayGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JumpAwayGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
