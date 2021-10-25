import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiolearnComponent } from './radiolearn.component';

describe('RadiolearnComponent', () => {
  let component: RadiolearnComponent;
  let fixture: ComponentFixture<RadiolearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiolearnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiolearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
