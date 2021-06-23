import { TestBed } from "@angular/core/testing";

import { DictManager } from "../services/dict-manager.service";

describe("DictManagerServiceService", () => {
  let service: DictManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictManager);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
