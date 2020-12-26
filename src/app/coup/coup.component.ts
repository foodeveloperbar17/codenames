import {Component, HostListener, OnInit} from '@angular/core';
import {Card} from '../models/Card';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/User';
import {Room} from '../models/Room';
import {DbService} from '../../services/db.service';

@Component({
  selector: 'app-coup',
  templateUrl: './coup.component.html',
  styleUrls: ['./coup.component.css']
})
export class CoupComponent implements OnInit {

  currentUser: User = new User('', '', 'spectator', false);

  room: Room | undefined;
  roomId: string | undefined;

  cardsIsRevealed: boolean[] = [false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false];

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(): void {
    if (this.currentUser.id !== '' && this.room !== undefined) {
      this.room.users = this.room.users.filter(user => user.id !== this.currentUser.id);
      this.dbService.saveRoom(this.room);
    }
  }

  constructor(private route: ActivatedRoute, private dbService: DbService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = params.id;
      if (params.hasOwnProperty('room')) {
        this.room = JSON.parse(params.room) as Room;
        this.currentUser = this.room.users[0];
        this.dbService.getRoom(this.roomId as string).subscribe(docSnapshot => {
          if (docSnapshot.exists) {
            this.room = docSnapshot.data() as Room;
          } else {
            this.dbService.saveRoom(this.room as Room);
          }
        });
      } else {
        this.dbService.getRoom(this.roomId as string).subscribe(roomDoc => {
            if (roomDoc.exists) {
              this.room = roomDoc.data() as Room;
            } else {
              console.log('Something bad happens hereee');
            }
          }
        );
      }
      this.addRoomListener();
    });
  }

  addRoomListener(): void {
    this.dbService.getRoomListener(this.roomId as string).subscribe(roomDocument => {
        if (roomDocument !== undefined) {
          this.room = roomDocument as Room;
        } else {
          console.log('no room data');
        }

      }
    );
  }

  cardClicked(card: Card): void {
    if (this.room === undefined) {
      return;
    }
    if (!card.isGuessed && this.room.isGuessing && !this.currentUser.isSpymaster
      && this.currentUser.team === this.room.whoseTurn && !this.room.isFinished) {
      card.isGuessed = true;

      if (this.checkForTeamWin('red')) {
        this.room.winnerTeam = 'red';
        this.room.isFinished = true;
        return;
      }
      if (this.checkForTeamWin('blue')) {
        this.room.winnerTeam = 'blue';
        this.room.isFinished = true;
        return;
      }

      if (card.color !== this.currentUser.team) {
        this.changeTurn();
        this.checkForAssasin(card);
      } else if (--this.room.numTries === 0) {
        this.changeTurn();
      }
    }

    this.dbService.saveRoom(this.room as Room);
  }

  changeTurn(): void {
    if (this.room === undefined) {
      return;
    }
    this.room.whoseTurn = this.secondTeam(this.room.whoseTurn);
    this.room.isGuessing = false;
    this.room.numTries = 0;
    this.room.message = '';
  }

  secondTeam(team: string): string {
    if (team === 'red') {
      return 'blue';
    } else if (team === 'blue') {
      return 'red';
    }
    throw Error('invalid team');
  }

  checkForAssasin(card: Card): void {
    if (this.room === undefined) {
      return;
    }
    if (card.color === 'black') {
      this.room.isFinished = true;
      if (this.currentUser.team === 'red') {
        this.room.winnerTeam = 'blue';
      } else {
        this.room.winnerTeam = 'red';
      }
    }
  }

  checkForTeamWin(team: string): boolean {
    if (this.room === undefined) {
      return false;
    }
    const length = this.room.cards.filter(c => !c.isGuessed && c.color === team).length;
    console.log(length);
    return length === 0;
  }

  isMyTurn(): boolean {
    if (this.room?.whoseTurn === this.currentUser.team
      && this.room?.isGuessing === !this.currentUser.isSpymaster) {
      return true;
    } else {
      return false;
    }
  }

  joinUser(): void {
    if (!this.currentUser.nickname) {
      this.currentUser.nickname = 'I Told you to enter your nickname';
    }
    this.currentUser.id = this.dbService.getRandomString();

    this.dbService.addUserToRoom(this.currentUser, this.roomId as string);
  }

  guessedCardClicked(index: number): void {
    this.cardsIsRevealed[index] = !this.cardsIsRevealed[index];
  }

  get redOperatives(): User[] {
    return this.filterWithTeamAndGroup('red', false);
  }

  get redSpymasters(): User[] {
    return this.filterWithTeamAndGroup('red', true);
  }

  get blueOperatives(): User[] {
    return this.filterWithTeamAndGroup('blue', false);
  }

  get blueSpymasters(): User[] {
    return this.filterWithTeamAndGroup('blue', true);
  }

  get spectators(): User[] {
    if (this.room === undefined) {
      return [];
    } else {
      return this.room.users.filter(user => user.team === 'spectator');
    }
  }

  filterWithTeamAndGroup(team: string, isSpymaster: boolean): User[] {
    if (this.room === undefined) {
      return [];
    } else {
      return this.room.users.filter(user => user.team === team && user.isSpymaster === isSpymaster);
    }
  }

  joinTeamAndGroup(team: string, isSpyMaster: boolean): void {
    this.currentUser.team = team;
    this.currentUser.isSpymaster = isSpyMaster;
    // doing same for room user
    const index = this.room?.users.findIndex(user => user.id === this.currentUser.id) as number;
    if (index !== -1 && this.room?.users !== undefined) {
      this.room.users[index].team = team;
      this.room.users[index].isSpymaster = isSpyMaster;
    } else {
      console.log('there is a bug');
    }
    this.dbService.saveRoom(this.room as Room);
  }

  startGame(): void {
    if (this.room !== undefined) {
      if (this.room.users.length < 4) {
        return;
      }
      if (this.redSpymasters.length > 0
        && this.redOperatives.length > 0
        && this.blueSpymasters.length > 0
        && this.blueOperatives.length > 0) {
        this.room.isStarted = true;
        this.dbService.saveRoom(this.room);
      }
    }
  }

  sendHint(): void {
    if (this.room !== undefined) {
      this.room.isGuessing = true;
      this.dbService.saveRoom(this.room);
    }
  }

  spymasterExistsInTeam(team: string): boolean {
    if (this.room === undefined) {
      return false;
    }
    return this.room.users.filter(user => user.isSpymaster && user.team === team).length !== 0;
  }

  cardsLeft(team: string): string {
    if (this.room === undefined) {
      return '';
    }
    return this.room.cards.filter(card => !card.isGuessed && card.color === team).length.toString();
  }
}
