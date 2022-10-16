import { useState } from "react";

const NewEventForm = () => {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  return (
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
            <option>12:00</option>
            <option>12:15</option>
            <option>12:30</option>
            <option>12:45</option>
            <option>13:00</option>
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
            <option>12:00</option>
            <option>12:15</option>
            <option>12:30</option>
            <option>12:45</option>
            <option>13:00</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default NewEventForm;
