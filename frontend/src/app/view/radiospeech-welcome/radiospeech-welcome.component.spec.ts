import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiospeechWelcomeComponent } from '@app/view';

describe('RadiospeechWelcomeComponent', () => {
  let component: RadiospeechWelcomeComponent;
  let fixture: ComponentFixture<RadiospeechWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiospeechWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiospeechWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
