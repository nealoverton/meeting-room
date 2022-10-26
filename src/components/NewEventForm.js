import { useContext, useEffect, useState } from "react";
import {
  generateStartTimeIncrements,
  generateEndTimeIncrements,
} from "../formatting/dateAndTimeFormatting";
import { authContext } from "../authContext";
import { addEvent } from "../firestore";

const NewEventForm = () => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState();
  const [startTimeIncrements, setStartTimeIncrements] = useState();
  const [endTimeIncrements, setEndTimeIncrements] = useState();
  const { authentication } = useContext(authContext);

  useEffect(() => {
    setStartTimeIncrements(generateStartTimeIncrements());
    setEndTimeIncrements(generateEndTimeIncrements(startTime));
    setLoading(false);
  }, [startTime]);

  const submitEvent = async (event) => {
    event.preventDefault();

    const owner = authentication.uid;

    let theEndTime = "";
    if (endTime) {
      theEndTime = endTime;
      console.log("there is an end time: " + theEndTime);
    } else {
      theEndTime = endTimeIncrements[0];
      console.log("no end time so: " + theEndTime);
    }

    return addEvent(title, startTime, theEndTime, owner);
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h2>Create New Event</h2>
      <form>
        <label>
          Event Title:
          <input
            type="text"
            name="title"
            onChange={(event) => {
              setTitle(event.target.value);
              console.log(title);
            }}
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            onChange={(event) => {
              setDate(event.target.value);
              console.log(date);
            }}
          />
        </label>

        <label>
          Start Time:
          <select
            onChange={(event) => {
              setStartTime(event.target.value);
            }}
          >
            {startTimeIncrements.map((increment, index) => {
              return <option key={index}>{increment}</option>;
            })}
          </select>
        </label>

        <label>
          End Time:
          <select
            onChange={(event) => {
              setEndTime(event.target.value);
              console.log(endTime);
            }}
          >
            {endTimeIncrements.map((increment, index) => {
              return <option key={index}>{increment}</option>;
            })}
          </select>
        </label>

        <button
          type="submit"
          name="event-submit"
          id="event-submit"
          onClick={submitEvent}
        >
          Book Meeting
        </button>
      </form>
    </div>
  );
};

export default NewEventForm;
