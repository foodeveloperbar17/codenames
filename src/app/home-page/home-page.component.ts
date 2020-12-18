import {Component, OnInit} from '@angular/core';
import {User} from '../models/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  nickname: string | undefined;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  createGame(): void {
    let hostName = 'I Told you to enter your nickname';
    if (this.nickname !== undefined) {
      hostName = this.nickname;
    }
    const id = 'blablabla';
    const host = new User(id, hostName, true);

    this.userService.setUser(host);

  //  TODO: add call to firebase
  }
}
