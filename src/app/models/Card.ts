export class Card{
  id: number;
  imgPath: string;
  color: string;
  isGuessed: boolean;


  constructor(id: number, imgPath: string, color: string) {
    this.id = id;
    this.imgPath = imgPath;
    this.color = color;
    this.isGuessed = false;
  }
}
