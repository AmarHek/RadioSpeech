import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepLearningDialogComponent } from './deep-learning-dialog.component';

describe('DeepLearningDialogComponent', () => {
  let component: DeepLearningDialogComponent;
  let fixture: ComponentFixture<DeepLearningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeepLearningDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepLearningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
