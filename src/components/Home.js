import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import { useContext, useEffect, useState } from "react";
import { authContext } from "../authContext";
import { logOut } from "../firebase";
import { addEvent, createProfileFromUser, getEvents, updateEvent } from "../firestore";
import NewEventForm from "./NewEventForm";

const Home = () => {
  const { authentication } = useContext(authContext);
  const [profile, setProfile] = useState();
  const [events, setEvents] = useState();
  const [newEventFormIsOpen, setNewEventFormIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
        const currentProfile = await createProfileFromUser(authentication);
        setProfile(currentProfile);

        console.log(new Date().getUTCHours() + ":00:00")

        const exampleEvent = 
            {
              title: "Test",
              start: "2022-10-20T12:00Z",
              end: "2022-10-20T16:00Z",
              owner: authentication.uid,
              allDay: false,
            };
        //await addEvent(exampleEvent.title, exampleEvent.start, exampleEvent.end, exampleEvent.owner);

        setEvents(await getEvents(authentication.uid));
    })();
  }, [authentication]);

  const handleEventChange = (changeInfo) => {
    updateEvent(changeInfo.event.title, changeInfo.event.start.toISOString(), changeInfo.event.end.toISOString(), authentication.uid, changeInfo.event.id)
  }

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          setNewEventFormIsOpen(!newEventFormIsOpen);
        }}
      >
        Add event
      </button>
      {newEventFormIsOpen ? <NewEventForm /> : <></>}
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height={600}
        slotMinTime={"08:00:00"}
        slotMaxTime={"23:00:00"}
        timeZone="Europe/London"
        weekends={false}
        allDaySlot={false}
        slotDuration={"00:15:00"}
        nowIndicator={true}
        scrollTime={new Date().getUTCHours() + ":00:00"}
        editable={true}
        selectable={true}
        selectOverlap={false}
        events={events}
        eventChange={handleEventChange}
      />

      {!profile ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {Object.keys(profile).map((setting, index) => {
            return <li key={index}>{setting + ":  " + profile[setting]}</li>;
          })}
        </ul>
      )}
      {!profile ? (
        <p>Loading...</p>
      ) : (
        <img src={profile.avatar} alt={"User Avatar"} />
      )}
      <button onClick={() => logOut()}>Log out</button>
    </div>
  );
};

export default Home;
