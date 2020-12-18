export class User{
  id: string;
  nickname: string;
  isHost: boolean;


  constructor(id: string, nickname: string, isHost: boolean) {
    this.id = id;
    this.nickname = nickname;
    this.isHost = isHost;
  }
}
