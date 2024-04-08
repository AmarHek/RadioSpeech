import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorOptionsComponent } from './editor-options.component';

describe('ReportEditOptionsComponent', () => {
  let component: EditorOptionsComponent;
  let fixture: ComponentFixture<EditorOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
