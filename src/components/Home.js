import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../authContext";
import { logOut } from "../firebase";
import { addEvent, createProfileFromUser, getEvents } from "../firestore";
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

        const exampleEvent = 
            {
              title: "Event1",
              start: "2022-10-19T12:00:00.000Z",
              end: "2022-10-19T16:00:00.000Z",
              owner: "81dUF3rggVcabaR4ZbZvt0BGYX63",
              allDay: false,
            };
        await addEvent(exampleEvent.title, exampleEvent.start, exampleEvent.end, exampleEvent.owner);

        setEvents(await getEvents());
    })();
  }, [authentication]);

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
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        weekends={false}
        events={events}
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
