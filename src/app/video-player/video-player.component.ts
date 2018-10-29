import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  height = 150;
  y = 100;
  oldY = 0;
  grabber = false;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.grabber) {
        return;
    }
    this.resizer(event.clientY - this.oldY);
    this.oldY = event.clientY;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.grabber = false;
  }

  resizer(offsetY: number) {
    this.height += offsetY;
  }


  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.grabber = true;
    this.oldY = event.clientY;
  }
}


