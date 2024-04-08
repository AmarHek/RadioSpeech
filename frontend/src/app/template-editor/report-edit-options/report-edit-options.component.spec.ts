import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEditOptionsComponent } from './report-edit-options.component';

describe('ReportEditOptionsComponent', () => {
  let component: ReportEditOptionsComponent;
  let fixture: ComponentFixture<ReportEditOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEditOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportEditOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
