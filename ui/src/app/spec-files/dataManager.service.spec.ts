import { TestBed } from '@angular/core/testing';

import { DataParserService } from '../services/dataParser.service';

describe('DataBuilderService', () => {
  let service: DataParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
