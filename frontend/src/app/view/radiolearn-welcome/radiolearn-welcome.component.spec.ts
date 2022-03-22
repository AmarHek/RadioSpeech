import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiolearnWelcomeComponent } from './radiolearn-welcome.component';

describe('RadiolearnWelcomeComponent', () => {
  let component: RadiolearnWelcomeComponent;
  let fixture: ComponentFixture<RadiolearnWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiolearnWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiolearnWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
