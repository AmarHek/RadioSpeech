import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineImageDisplayComponent } from './inline-image-display.component';

describe('InlineImageDisplayComponent', () => {
  let component: InlineImageDisplayComponent;
  let fixture: ComponentFixture<InlineImageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineImageDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineImageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
