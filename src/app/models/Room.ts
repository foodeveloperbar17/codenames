import {Card} from './Card';
import {User} from './User';

export class Room {
  id: string;
  cards: Card[];
  host: User;
  otherUsers: User[];

  constructor(id: string, cards: Card[], host: User, otherUsers: User[]) {
    this.id = id;
    this.cards = cards;
    this.host = host;
    this.otherUsers = otherUsers;
  }
}
