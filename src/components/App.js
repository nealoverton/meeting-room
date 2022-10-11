import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "../styles/styles.js";

function App() {
  let dayGridLayout = "dayGridDay";
  return (
    <div className="App">
      <h1>Book A Meeting Application</h1>
      <FullCalendar
        initialView={dayGridLayout}
        plugins={[dayGridPlugin, timeGridPlugin]}
        // initialView="timeGridWeek"
        weekends={false}
        slotDuration="00:30:00"
        slotMinTime="00:00:00"
      />
    </div>
  );
}

export default App;
