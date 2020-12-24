export class User{
  id: string;
  nickname: string;
  team: string;
  isSpymaster: boolean;
  isHost: boolean;


  constructor(id: string, nickname: string, team: string, isHost: boolean) {
    this.id = id;
    this.nickname = nickname;
    this.team = team;
    this.isSpymaster = false;
    this.isHost = isHost;
  }
}
