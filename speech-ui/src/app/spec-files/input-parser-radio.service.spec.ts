import { TestBed } from '@angular/core/testing';

import { InputParserService } from '../services/input-parser.service';

describe('InputParserRadioService', () => {
  let service: InputParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
