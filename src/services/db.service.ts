import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private firestore: AngularFirestore) {
  }

  bla(): void {
    // this.firestore.collection('bla').add(data).then(res => {
    //
    // });
  }
}
