import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineImageDisplayStudentComponent } from './inline-image-display-student.component';

describe('InlineImageDisplayStudentComponent', () => {
  let component: InlineImageDisplayStudentComponent;
  let fixture: ComponentFixture<InlineImageDisplayStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineImageDisplayStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineImageDisplayStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
