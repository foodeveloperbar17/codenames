import {Injectable} from '@angular/core';
import {User} from '../app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User | undefined;

  constructor() {
  }

  setUser(user: User): void {
    this.currentUser = user;
  }

  getUser(): User | undefined {
    return this.currentUser;
  }
}
