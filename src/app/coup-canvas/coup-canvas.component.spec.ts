import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupCanvasComponent } from './coup-canvas.component';

describe('CoupCanvasComponent', () => {
  let component: CoupCanvasComponent;
  let fixture: ComponentFixture<CoupCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoupCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
