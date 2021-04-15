import { TestBed } from '@angular/core/testing';

import { GuardarArchivoService } from './guardar-archivo.service';

describe('GuardarArchivoService', () => {
  let service: GuardarArchivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardarArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
