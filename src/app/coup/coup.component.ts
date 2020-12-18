import {Component, OnInit} from '@angular/core';
import {Card} from '../models/Card';

@Component({
  selector: 'app-coup',
  templateUrl: './coup.component.html',
  styleUrls: ['./coup.component.css']
})
export class CoupComponent implements OnInit {
  NUM_CARDS = 20;
  cardTypes: string[] = [];
  randomedNumbersForCards: number[] = [];
  cards: Card[] = [];

  constructor() {
    this.initCardTypes();
    this.randomInitCards();
  }

  ngOnInit(): void {
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
      const imgPath = this.getImagePath(273);
      this.cards?.push(new Card(i, imgPath, this.cardTypes[i]));
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

  cardClicked(card: Card): void {
    if (!card.isGuessed) {
      card.isGuessed = true;
    }
  //  TODO: add animation of reveal
  }
}
