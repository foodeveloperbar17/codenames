import {Component, OnInit} from '@angular/core';
import {User} from '../models/User';
import {Router} from '@angular/router';
import {Room} from '../models/Room';
import {DbService} from '../../services/db.service';
import {Card} from '../models/Card';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  nickname: string | undefined;

  NUM_CARDS = 20;
  cardTypes: string[] = [];
  randomedNumbersForCards: number[] = [];
  cards: Card[] = [];

  constructor(private router: Router, private dbService: DbService) {
    this.initCardTypes();
    this.randomInitCards();
  }

  ngOnInit(): void {
  }

  createGame(): void {
    let hostName = 'I Told you to enter your nickname';
    if (this.nickname !== undefined) {
      hostName = this.nickname;
    }
    const hostId = this.dbService.getRandomString();
    const host = new User(hostId, hostName, 'spectator', true);

    const roomId = this.dbService.getRandomString();
    const room = new Room(roomId, this.cards, [host], 'red');
    this.router.navigate(['room/' + roomId, {room: JSON.stringify(room)}]);
  }


  initCardTypes(): void {
    for (let i = 0; i < this.NUM_CARDS; i++) {
      this.cardTypes.push('red');
    }

    this.randomBlues();
    this.randomWhites();
    this.randomAssassin();
  }

  randomBlues(): void {
    this.randomNumbers(7, 'blue');
  }

  randomWhites(): void {
    this.randomNumbers(4, 'white');
  }

  randomAssassin(): void {
    this.randomNumbers(1, 'black');
  }

  randomNumbers(times: number, type: string): void {
    for (let i = 0; i < times; i++) {
      while (true) {
        const rand = Math.random();
        const num = Math.round(rand * (this.NUM_CARDS - 1));
        if (!this.numberAlreadyGenerated(num, this.randomedNumbersForCards)) {
          this.randomedNumbersForCards.push(num);
          this.cardTypes[num] = type;
          break;
        }
      }
    }
  }

  numberAlreadyGenerated(num: number, list: number[]): boolean {
    return list.includes(num);
  }


  randomInitCards(): void {
    for (let i = 0; i < this.NUM_CARDS; i++) {
      const imgPath = this.getImagePath(180);
      this.cards.push(new Card(i, imgPath, this.cardTypes[i]));
    }
  }

  getImagePath(maxNumber: number): string {
    const num = this.uniqueRandomNumber(maxNumber);
    const zPadNum = this.zeroPadToNumber(num, 4);
    return 'assets/images/' + zPadNum + '.jpg';
  }

  private uniqueRandomNumber(maxNumber: number): number {
    while (true) {
      const num = Math.round(Math.random() * maxNumber);
      if (!this.cardAlreadyExists(num)) {
        return num;
      }
    }
  }

  private cardAlreadyExists(id: number): boolean {
    for (const card of this.cards) {
      if (card.id == id) {
        return true;
      }
    }
    return false;
  }

  private zeroPadToNumber(n: number, size: number): string {
    const pad = new Array(size + 1).join('0');
    const joined = pad + n;
    return joined.slice(-size);
  }

}
