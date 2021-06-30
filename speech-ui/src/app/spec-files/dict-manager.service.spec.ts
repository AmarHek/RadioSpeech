import { TestBed } from "@angular/core/testing";

import { TemplateManager } from "../services/template-manager.service";

describe("DictManagerServiceService", () => {
  let service: TemplateManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateManager);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
