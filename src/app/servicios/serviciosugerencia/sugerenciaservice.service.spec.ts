import { TestBed } from '@angular/core/testing';

import { SugerenciaserviceService } from './sugerenciaservice.service';

describe('SugerenciaserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SugerenciaserviceService = TestBed.get(SugerenciaserviceService);
    expect(service).toBeTruthy();
  });
});
