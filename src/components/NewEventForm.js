import { useEffect, useState } from "react";
import { generateStartTimeIncrements, generateEndTimeIncrements, calculateDefaultEndTime } from "../formatting/dateAndTimeFormatting";

const NewEventForm = ({selectedDate}) => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("New Meeting");

  const defaultDate = selectedDate ? selectedDate.dateStr.slice(0, 10) : new Date().toISOString().slice(0,10);
  const defaultStartTime = selectedDate ? selectedDate.dateStr.slice(11, 16) : "08:00";

  const [date, setDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(calculateDefaultEndTime(startTime));
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
            defaultValue={"New Meeting"}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            defaultValue={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
        </label>

        <label>
          Start Time:
          <select
          defaultValue={startTime}
            onChange={(event) => {
              setStartTime(event.target.value);
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
            defaultValue={endTime}
            onChange={(event) => {
              setEndTime(event.target.value);
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
