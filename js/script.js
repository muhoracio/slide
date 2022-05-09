import SlideNav from "./slidenav";

const slide = new SlideNav(".slide", ".slide-wrapper");
slide.init().addArrows(".prev", ".next").addControl();
