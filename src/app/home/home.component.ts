import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: string[] = [
    'assets/img/bitemoji.jpg',
  ];
  /*
    'assets/img/mau.jpg',
    'assets/img/spi.jpg',
    'assets/img/selfie.jpg',
    'assets/img/sunglasses.jpg',
    'assets/img/csg.jpg',
    'assets/img/sheridan.jpg',
    'assets/img/gym.jpg',
    'assets/img/udem.jpg',
  */
  imageSource: string = this.images[0];
  tops: string[] = ['3px', '23px', '43px', '63px', '83px', '103px', '123px'];
  i: number = 0;
  j: number = 0;
  interval: number;

  constructor() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = window.setInterval(() => {
      this.updateText();
    }, 1000);
  };

  ngOnInit() {
  };

  updateText() {
    let selector: HTMLElement = document.getElementById('selector');
    if (selector) {
      selector.style.top = this.tops[this.i];
      this.imageSource = this.images[this.j];
      this.i++;
      if (this.i == this.tops.length) {
        this.i = 0;
        this.j++;
        if (this.j == this.images.length) {
          this.j = 0;
        }
      }
    }
  };
};
