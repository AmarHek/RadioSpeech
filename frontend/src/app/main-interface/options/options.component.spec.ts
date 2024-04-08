import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOptionsComponent } from '@app/shared';

describe('OptionsComponent', () => {
  let component: ReportOptionsComponent;
  let fixture: ComponentFixture<ReportOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
