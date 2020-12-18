export class Circle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  minRadius: number;
  maxRadius: number;
  red: number;
  green: number;
  blue: number;
  alpha: number;
  lineWidth: number;


  constructor(x: number, y: number, dx: number, dy: number, radius: number, maxRadius: number, red: number, green: number, blue: number, alpha: number, lineWidth: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = maxRadius;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
    this.lineWidth = lineWidth;
  }
}
