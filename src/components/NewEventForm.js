import { useEffect, useState } from "react";
import { generateStartTimeIncrements, generateEndTimeIncrements } from "../formatting/dateAndTimeFormatting";

const NewEventForm = () => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState();
  const [startTimeIncrements, setStartTimeIncrements] = useState();
  const [endTimeIncrements, setEndTimeIncrements] = useState();

  useEffect(() => {
    setStartTimeIncrements(generateStartTimeIncrements());
    setEndTimeIncrements(generateEndTimeIncrements(startTime));
    setLoading(false);
  }, [startTime]);

  return loading ? <p>Loading...</p> : (
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
              console.log(startTime);
            }}
          >
            {startTimeIncrements.map((increment, index) => {
              return <option key={index}>{increment}</option>
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
              return <option key={index}>{increment}</option>
            })}
          </select>
        </label>
      </form>
    </div>
  );
};

export default NewEventForm;
