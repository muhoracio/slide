export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPos: 0, startX: 0, movement: 0 };
  }

  moveSlide(distX) {
    this.dist.movePos = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0px, 0px)`;
  }
  
  updatePos(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPos - this.dist.movement;
  }

  onStart(e) {
    e.preventDefault();
    this.dist.startX = e.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }
  
  onMove(e) {
    const finalPos = this.updatePos(e.clientX);
    this.moveSlide(finalPos);
  }
  
  onEnd() {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.dist.finalPos = this.dist.movePos;
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}