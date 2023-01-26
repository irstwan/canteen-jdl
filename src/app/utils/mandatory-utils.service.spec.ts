import { TestBed } from '@angular/core/testing';

import { MandatoryUtilsService } from './mandatory-utils.service';

describe('MandatoryUtilsService', () => {
  let service: MandatoryUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MandatoryUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
