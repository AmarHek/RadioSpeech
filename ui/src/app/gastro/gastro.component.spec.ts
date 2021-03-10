import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GastroComponent } from './gastro.component';

describe('TextComponent', () => {
  let component: GastroComponent;
  let fixture: ComponentFixture<GastroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
