import { TestBed } from '@angular/core/testing';

import { CompilarService } from './compilar.service';

describe('CompilarService', () => {
  let service: CompilarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompilarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
