import {TestBed} from '@angular/core/testing';

import {DbService} from './db.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Room} from '../app/models/Room';

describe('DbService', () => {
  let service: DbService;
  const mockGuy = {
    collection: (path: string) => {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide: AngularFirestore, useValue: mockGuy}]});
    service = TestBed.inject(DbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
