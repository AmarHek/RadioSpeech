import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeMatComponent } from './judge-mat.component';

describe('JudgeMatComponent', () => {
  let component: JudgeMatComponent;
  let fixture: ComponentFixture<JudgeMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgeMatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
