import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMaterialHandlerComponent } from '@app/main-interface';

describe('InputMaterialHandlerComponent', () => {
  let component: InputMaterialHandlerComponent;
  let fixture: ComponentFixture<InputMaterialHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMaterialHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMaterialHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
