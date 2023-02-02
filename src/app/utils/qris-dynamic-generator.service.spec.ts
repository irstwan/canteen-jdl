import { TestBed } from '@angular/core/testing';

import { QrisDynamicGeneratorService } from './qris-dynamic-generator.service';

describe('QrisDynamicGeneratorService', () => {
  let service: QrisDynamicGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrisDynamicGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
