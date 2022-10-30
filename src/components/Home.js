import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../authContext";
import { logOut } from "../firebase";
import {
  addEvent,
  createProfileFromUser,
  getEvents,
  updateEvent,
} from "../firestore";
import NewEventForm from "./NewEventForm";
import Navbar from "./Navbar";

const Home = () => {
  const { currentUser } = useContext(authContext);
  const [profile, setProfile] = useState();
  const [events, setEvents] = useState();
  const [newEventFormIsOpen, setNewEventFormIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    (async () => {
      const currentProfile = await createProfileFromUser(currentUser);
      setProfile(currentProfile);

      console.log(new Date().getUTCHours() + ":00:00");

      const exampleEvent = {
        title: "Test",
        start: "2022-10-20T12:00Z",
        end: "2022-10-20T16:00Z",
        owner: currentUser.uid,
        allDay: false,
      };
      //await addEvent(exampleEvent.title, exampleEvent.start, exampleEvent.end, exampleEvent.owner);

      setEvents(await getEvents(currentUser.uid));
    })();
  }, [currentUser]);

  const handleEventChange = (changeInfo) => {
    updateEvent(
      changeInfo.event.title,
      changeInfo.event.start.toISOString(),
      changeInfo.event.end.toISOString(),
      currentUser.uid,
      changeInfo.event.id
    );
  };

  const handleDateClick = async (dateInfo) => {
    console.log(dateInfo.dateStr.slice(0, 10));
    await setSelectedDate(dateInfo);
    setNewEventFormIsOpen(true);
  };

  return (
    <div>
      <Navbar></Navbar>
      <h1>Home</h1>
      <button
        onClick={() => {
          setNewEventFormIsOpen(!newEventFormIsOpen);
        }}
      >
        Add event
      </button>
      {newEventFormIsOpen ? (
        <NewEventForm selectedDate={selectedDate} setEvents={setEvents} />
      ) : (
        <></>
      )}
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height={600}
        slotMinTime={"08:00:00"}
        slotMaxTime={"20:00:00"}
        timeZone="Europe/London"
        weekends={false}
        allDaySlot={false}
        slotDuration={"00:15:00"}
        nowIndicator={true}
        scrollTime={new Date().getUTCHours() + ":00"}
        editable={true}
        selectable={true}
        selectOverlap={false}
        events={events}
        eventChange={handleEventChange}
        dateClick={handleDateClick}
      />

      <button onClick={() => logOut()}>Log out</button>
    </div>
  );
};

export default Home;
