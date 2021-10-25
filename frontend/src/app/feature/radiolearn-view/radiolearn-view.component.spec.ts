import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiolearnViewComponent } from './radiolearn-view.component';

describe('RadiolearnViewComponent', () => {
  let component: RadiolearnViewComponent;
  let fixture: ComponentFixture<RadiolearnViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiolearnViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiolearnViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
