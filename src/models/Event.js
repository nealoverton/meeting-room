class Event {
  constructor(title, start, end, color) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.color = color;
    this.allDay = false;
  }
}

export default Event;
