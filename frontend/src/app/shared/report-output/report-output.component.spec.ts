import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ReportOutputComponent } from "./report-output.component";

describe("ReportComponent", () => {
  let component: ReportOutputComponent;
  let fixture: ComponentFixture<ReportOutputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
