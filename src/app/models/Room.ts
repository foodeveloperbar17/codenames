import {Card} from './Card';
import {User} from './User';

export class Room {
  id: string;
  cards: Card[];
  users: User[];
  whoseTurn: string;
  isStarted: boolean;


  constructor(id: string, cards: Card[], users: User[], whoseTurn: string) {
    this.id = id;
    this.cards = cards;
    this.users = users;
    this.whoseTurn = whoseTurn;
    this.isStarted = false;
  }
}
