import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  slideIndex: number = 1;

  constructor() { };

  ngOnInit() {
    this.showSlides(this.slideIndex);
  };

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  };

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  };

  showSlides(n) {
    let i: number;
    let slides: HTMLCollectionOf<Element> = document.getElementsByClassName("mySlides");
    let dots: HTMLCollectionOf<Element> = document.getElementsByClassName("demo");
    let captionText: HTMLElement = document.getElementById("caption");
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      (<HTMLElement>slides[i]).style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    (<HTMLElement>slides[this.slideIndex - 1]).style.display = "block";
    dots[this.slideIndex - 1].className += " active";
    captionText.innerHTML = (<HTMLImageElement>dots[this.slideIndex - 1]).alt;
  };

};
