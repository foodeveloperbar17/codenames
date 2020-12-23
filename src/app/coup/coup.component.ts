import {Component, OnInit} from '@angular/core';
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

  currentUser: User = new User('', '', false);

  room: Room | undefined;
  roomId: string | undefined;

  constructor(private route: ActivatedRoute, private dbService: DbService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = params.id;
      if (params.hasOwnProperty('room')) {
        this.room = JSON.parse(params.room) as Room;
        this.currentUser = this.room.host;
        this.dbService.saveRoom(this.room);
        this.addRoomListener();
      } else {
        this.addRoomListener();
      }
    });
  }

  addRoomListener(): void {
    this.dbService.getRoom(this.roomId as string).subscribe(roomDocument => {
        if (roomDocument !== undefined) {
          this.room = roomDocument as Room;
          console.log(roomDocument);
        } else {
          console.log('no room data');
        }
      }
    );
  }

  cardClicked(card: Card): void {
    if (!card.isGuessed) {
      card.isGuessed = true;
    }
    //  TODO: add animation of reveal
  }

  joinUser(): void {
    console.log('joined user');
    console.log(this.currentUser.nickname);
    console.log(!this.currentUser.nickname);
    if (!this.currentUser.nickname) {
      this.currentUser.nickname = 'I Told you to enter your nickname';
    }
    this.currentUser.id = this.dbService.getRandomString();

    this.dbService.addUserToRoom(this.currentUser, this.roomId as string);
  }
}
