import Slide from "./slide";

export default class SlideNav extends Slide {
  constructor(...args) {
    super(...args);
    this.bindControlEvents();
  }

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

  createControl() {
    const control = document.createElement("ul");
    control.dataset.control = "slide";
    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href='#slide${index + 1}'>${index}</a></li>`;
    })
    this.wrapper.appendChild(control);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      this.changeSlide(index);
      this.activeControlItem();
    });
  }

  activeControlItem() {
    this.controlArray.forEach(i => i.classList.remove(this.activeClass));
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  addControl(customControl) {
    this.control =  document.querySelector(customControl) ?? this.createControl();
    this.controlArray = [...this.control.children];

    this.activeControlItem();
    
    // Verifica de o Evento changeEvent foi acionado
    // Se sim, aciona novamente a função
    this.wrapper.addEventListener("changeEvent", this.activeControlItem);

    this.controlArray.forEach(this.eventControl);
    return this;
  }

  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}