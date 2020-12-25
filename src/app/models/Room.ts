import {Card} from './Card';
import {User} from './User';

export class Room {
  id: string;
  cards: Card[];
  users: User[];
  whoseTurn: string;
  isStarted: boolean;
  isGuessing: boolean;
  message: string;
  numTries: number;
  isFinished: boolean;
  winnerTeam: string;


  constructor(id: string, cards: Card[], users: User[], whoseTurn: string) {
    this.id = id;
    this.cards = cards;
    this.users = users;
    this.whoseTurn = whoseTurn;
    this.isStarted = false;
    this.isGuessing = false;
    this.message = '';
    this.numTries = 0;
    this.isFinished = false;
    this.winnerTeam = '';
  }
}
