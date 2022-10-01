import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../styles/styles.js";

function App() {
  return (
    <div className="App">
      <h1>Book A Meeting App</h1>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        weekends={false}
      />
    </div>
  );
}

export default App;
