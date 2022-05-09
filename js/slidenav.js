import Slide from "./slide";

export default class SlideNav extends Slide {
  addArrows(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);
    this.addArrowsEvents();
    return this;
  }

  addArrowsEvents() {
    this.prevElement.addEventListener("click", this.activePrevSlide);
    this.nextElement.addEventListener("click", this.activeNextSlide);
  }
}