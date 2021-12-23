import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiolearnErrorsComponent } from './radiolearn-errors.component';

describe('RadiolearnDifferencesComponent', () => {
  let component: RadiolearnErrorsComponent;
  let fixture: ComponentFixture<RadiolearnErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiolearnErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiolearnErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
