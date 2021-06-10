import { TestBed } from '@angular/core/testing';

import { ExportPackageGeneratorService } from '../services/export-package-generator.service';

describe('ExportPackageGeneratorService', () => {
  let service: ExportPackageGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportPackageGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
