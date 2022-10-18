import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../authContext";
import { logOut } from "../firebase";
import { addEvent, createProfileFromUser, getUserColours } from "../firestore";
import NewEventForm from "./NewEventForm";
import Event from "../models/Event";

const Home = () => {
  const { authentication } = useContext(authContext);
  const [profile, setProfile] = useState();
  const [events, setEvents] = useState();
  const [newEventFormIsOpen, setNewEventFormIsOpen] = useState(false);
  const [userColours, setUserColours] = useState([]);

  useEffect(() => {
    (async () => {
        setUserColours(await getUserColours());
        const currentProfile = await createProfileFromUser(authentication);
        setProfile(currentProfile);

        const exampleEvents = [
            {
              title: "Event1",
              start: "2022-10-17T12:00:00.000Z",
              end: "2022-10-17T16:00:00.000Z",
              owner: "81dUF3rggVcabaR4ZbZvt0BGYX63",
              allDay: false,
            },
          ];
        addEvent(exampleEvents[0].title, exampleEvents[0].start, exampleEvents[0].end, exampleEvents[0].owner)
        
        const colouredEvents = exampleEvents.map((event) => {
            const colouredEvent = new Event(event.title, event.start, event.end, userColours[event.owner]);
            return colouredEvent;
        })
        setEvents(colouredEvents);
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
