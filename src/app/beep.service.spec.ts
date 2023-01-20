import { TestBed } from '@angular/core/testing';

import { BeepService } from './beep.service';

describe('BeebService', () => {
  let service: BeepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
