import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiolearnDifferencesComponent } from './radiolearn-differences.component';

describe('RadiolearnDifferencesComponent', () => {
  let component: RadiolearnDifferencesComponent;
  let fixture: ComponentFixture<RadiolearnDifferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiolearnDifferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiolearnDifferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
