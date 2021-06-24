import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiBaseComponent } from './ui-base.component';

describe('WorkspaceComponent', () => {
  let component: UiBaseComponent;
  let fixture: ComponentFixture<UiBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
