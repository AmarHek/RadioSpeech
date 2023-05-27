import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPopUpComponent } from './result-pop-up.component';

describe('ResultPopUpComponent', () => {
  let component: ResultPopUpComponent;
  let fixture: ComponentFixture<ResultPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
