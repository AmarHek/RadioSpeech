import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMaterialComponent } from './display-material.component';

describe('DisplayMaterialComponent', () => {
  let component: DisplayMaterialComponent;
  let fixture: ComponentFixture<DisplayMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
