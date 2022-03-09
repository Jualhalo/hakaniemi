import { TestBed } from '@angular/core/testing';

import { FetchApidataService } from './fetch-apidata.service';

describe('FetchApidataService', () => {
  let service: FetchApidataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApidataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
