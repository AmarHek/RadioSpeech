import { TestBed } from '@angular/core/testing';

import { InputParserRadioService } from '../services/input-parser-radio.service';

describe('InputParserRadioService', () => {
  let service: InputParserRadioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputParserRadioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
