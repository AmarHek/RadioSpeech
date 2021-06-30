import { TestBed } from '@angular/core/testing';

import { MaterialManagerService } from '../services/material-manager.service';

describe('MaterialManagerService', () => {
  let service: MaterialManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
