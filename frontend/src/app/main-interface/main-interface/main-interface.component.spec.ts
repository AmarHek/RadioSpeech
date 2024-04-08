import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInterfaceComponent } from '@app/main-interface';

describe('WorkspaceComponent', () => {
  let component: MainInterfaceComponent;
  let fixture: ComponentFixture<MainInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
