import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupComponent } from './coup.component';

describe('CoupComponent', () => {
  let component: CoupComponent;
  let fixture: ComponentFixture<CoupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
