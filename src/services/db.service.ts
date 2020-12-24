import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentData} from '@angular/fire/firestore';
import {Room} from '../app/models/Room';
import {Observable} from 'rxjs';
import {User} from '../app/models/User';
import firebase from 'firebase';
import firestore = firebase.firestore;


@Injectable({
  providedIn: 'root'
})
export class DbService {
  roomsCollection: AngularFirestoreCollection;

  constructor(private angularFirestore: AngularFirestore) {
    this.roomsCollection = angularFirestore.collection('rooms');
  }

  saveRoom(room: Room): Promise<void> {
    return this.roomsCollection.doc(room.id).set(room);
  }

  getRoomListener(roomId: string): Observable<DocumentData | undefined> {
    return this.roomsCollection.doc(roomId).valueChanges();
  }

  getRandomString(): string {
    return this.angularFirestore.createId();
  }


  addUserToRoom(currentUser: User, roomId: string): void {
    const diffUser = Object.assign({}, currentUser);
    this.roomsCollection.doc(roomId).update({
      users: firestore.FieldValue.arrayUnion(diffUser)
    }).then(() => 'successfully added user').catch(() => 'meh error');
  }

  getRoom(roomId: string): Observable<firestore.DocumentSnapshot<DocumentData>> {
    return this.roomsCollection.doc(roomId).get();
  }
}
