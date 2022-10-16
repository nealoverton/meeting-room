import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../authContext";
import { logOut } from "../firebase";
import { createProfileFromUser } from "../firestore";
import NewEventForm from "./NewEventForm";

const Home = () => {
  const { authentication } = useContext(authContext);
  const [profile, setProfile] = useState();
  const [events, setEvents] = useState();
  const [newEventFormIsOpen, setNewEventFormIsOpen] = useState(false);

  useEffect(() => {
    createProfileFromUser(authentication).then((profileData) => {
      setProfile(profileData);
      const exampleEvents = [
        {
          title: "Event1",
          start: "2022-10-17T12:00:00.000Z",
          end: "2022-10-17T16:00:00.000Z",
          color: "red",
          allDay: false,
        },
        {
          title: "Event2",
          date: "2022-10-18",
          color: "green",
        },
      ];
      setEvents(exampleEvents);
    });
  }, []);

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
