import {AfterViewChecked, AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Circle} from '../models/Circle';
import {Mouse} from '../models/Mouse';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  canvas: HTMLCanvasElement | null | undefined;

  mouse = new Mouse(0, 0);

  circles: Circle[] = [];

  backupCircles: Circle[] | undefined;

  context: CanvasRenderingContext2D | null | undefined;

  HEIGHT_OFFSET = 50;

  constructor() {
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('canvasId') as HTMLCanvasElement;

    this.canvas.width = window.innerWidth - 13;
    this.canvas.height = window.innerHeight - this.HEIGHT_OFFSET;

    this.context = this.canvas.getContext('2d');

    this.addCircles(200);
  }

  @HostListener('document:mousemove', ['$event'])
  mouseMoved(event: MouseEvent): void {
    this.mouse.x = event.x;
    this.mouse.y = event.y;
  }

  addCircles(numCircles: number): void {
    for (let i = 0; i < numCircles; i++) {
      const radius = Math.random() * 8 + 3;
      const x = Math.random() * (innerWidth - 2 * radius - 20) + radius;
      const y = Math.random() * (innerHeight - 2 * radius - this.HEIGHT_OFFSET) + radius;
      let dx = Math.random() + 0.5;
      let dy = Math.random() + 0.5;
      if (Math.random() > 0.5) {
        dx = -dx;
      }
      if (Math.random() > 0.5) {
        dy = -dy;
      }

      const red = Math.random() * 55 + 200;
      const green = Math.random() * 100 + 100;
      const blue = Math.random() * 20;
      const alpha = Math.random() * 0.8 + 0.2;
      const lineWidth = Math.random() * 10 + 1;

      const circle = new Circle(x, y, dx, dy, radius, 10 * radius, red, green, blue, alpha, lineWidth);
      this.circles.push(circle);
    }
  }

  animate(): void {
    requestAnimationFrame(this.animate.bind(this));

    if (this.context != null) {
      this.context.clearRect(0, 0, innerWidth, innerHeight);

      for (const circle of this.circles) {
        if (circle.x + circle.radius >= innerWidth || circle.x - circle.radius < 0) {
          circle.dx = -circle.dx;
        }
        if (circle.y - circle.radius < 0 || circle.y + circle.radius + this.HEIGHT_OFFSET > innerHeight) {
          circle.dy = -circle.dy;
        }
        circle.x += circle.dx;
        circle.y += circle.dy;

        const distanceFromMouse = this.getDistanceFromMouse(circle);

        if (distanceFromMouse < 70 && circle.radius + 1 <= circle.maxRadius) {
          circle.radius++;
        } else if (distanceFromMouse > 70 && circle.radius - 1 >= circle.minRadius) {
          circle.radius--;
        }

        this.context.beginPath();
        this.context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
        this.context.strokeStyle = `rgba(${circle.red},${circle.green}, ${circle.blue},${circle.alpha})`;
        this.context.lineWidth = circle.lineWidth;
        this.context.stroke();
        this.context.fillStyle = `rgba(${circle.red},${circle.green}, ${circle.blue},${circle.alpha})`;
        this.context.fill();
      }
    }
  }

  getDistanceFromMouse(circle: Circle): number {
    const sum = Math.pow(circle.x - this.mouse.x, 2) + Math.pow(circle.y - this.mouse.y, 2);
    return Math.sqrt(sum);
  }

  play(): void {
    if (this.backupCircles !== undefined) {
      this.circles = this.backupCircles;
      this.backupCircles = undefined;
    } else {
      this.animate();
    }
  }

  stop(): void {
    this.backupCircles = this.circles;
    this.circles = [];
  }
}
