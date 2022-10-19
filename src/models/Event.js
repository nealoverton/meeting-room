class Event {
  constructor(title, start, end, color, eventID) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.color = color;
    this.eventID = eventID
    this.allDay = false;
  }
}

export default Event;
