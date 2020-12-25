import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePageComponent} from './home-page.component';
import {DbService} from '../../services/db.service';
import {Router} from '@angular/router';
import {DebugElement} from '@angular/core';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let debugElement: DebugElement;

  const dbService = {};
  const router = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [
        {provide: DbService, useValue: dbService},
        {provide: Router, useValue: router}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have unique cards', () => {
    const c = component as HomePageComponent;
    for (let i = 0; i < 1000; i++) {
      for (const card of c.cards) {
        const repeatedImage = c.cards.filter(currCard => currCard.imgPath === card.imgPath).length;
        expect(repeatedImage).toBe(1);
      }
    }
    expect(c.cards.length).toBe(20);
  });
});
