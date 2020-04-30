import { TestBed, inject } from '@angular/core/testing';

import { InputParserService } from './input-parser.service';

describe('InputParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputParserService]
    });
  });

  it('should be created', inject([InputParserService], (service: InputParserService) => {
    expect(service).toBeTruthy();
  }));
});
