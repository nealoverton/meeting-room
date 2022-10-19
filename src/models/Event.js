class Event {
  constructor(title, start, end, color, eventID, editable = false) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.color = color;
    this.eventID = eventID;
    this.editable = editable;
    this.allDay = false;
    
  }
}

export default Event;
