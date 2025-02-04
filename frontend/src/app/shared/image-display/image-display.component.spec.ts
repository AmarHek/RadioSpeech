import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ImageDisplayComponent } from "@app/shared";

describe("InlineImageDisplayComponent", () => {
  let component: ImageDisplayComponent;
  let fixture: ComponentFixture<ImageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
