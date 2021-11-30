import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiolearnListComponent } from './radiolearn-list.component';

describe('DisplayMaterialComponent', () => {
  let component: RadiolearnListComponent;
  let fixture: ComponentFixture<RadiolearnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiolearnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiolearnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
