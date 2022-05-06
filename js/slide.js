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
    let movetype;
    if (e.type === "mousedown") {
      e.preventDefault();
      this.dist.startX = e.clientX;
      movetype = "mousemove";
    }
    else {
      this.dist.startX = e.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    this.wrapper.addEventListener(movetype, this.onMove);
  }
  
  onMove(e) {
    const pointerPos = (e.type === "mousemove") ? e.clientX : e.changedTouches[0].clientX;
    const finalPos = this.updatePos(pointerPos);
    this.moveSlide(finalPos);
  }
  
  onEnd(e) {
    const moveType = (e.type === "mouseup") ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.dist.finalPos = this.dist.movePos;
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // Slides Config
  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((el) => {
      const pos = this.slidePosition(el);
      return { el, pos }
    });
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: (index) ? index - 1 : undefined,
      active: index,
      next: (index === last) ? undefined : index + 1
    }
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.pos);
    this.slidesIndexNav(index);
    this.dist.finalPos = activeSlide.pos;
  }

  init() {
    this.slidesConfig();
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}