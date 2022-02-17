import { useEffect, useState, useRef } from "react";
import Odds from "./Odds";
import "./App.css";

const initialPosition = {
  top: 1
};

const size = {
  // <-- this is the size of the clip space
  height: 251,
  width: 301
};

const App = () => {
  const idsRef = useRef([]);
  const [events, setEvents] = useState([]);
  const [position, setPosition] = useState(initialPosition);

  const changeSlide = () => {
    setPosition((currentPosition) => ({
      ...currentPosition,
      top: currentPosition.top - size.height
    }));
  };

  useEffect(() => {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 2 < 10
        ? `1${today.getMonth() + 1}`
        : today.getMonth() + 2
    }-${today.getDate()}`;

    fetch(
      `https://eapi.enetpulse.com/event/fixtures/?username=brobetapiusr&token=9851ce958d2c588be4eba8597b9d0750&sportFK=1&includeEventProperties=no&date=2022-02-28`
    )
      .then((response) => response.json())
      .then((data) => {
        const keys = Object.keys(data.events);
        const eventData = [];
        for (const key of keys) {
          eventData.push(data.events[key]);
        }
        setEvents(eventData);
      });
  }, []);

  useEffect(() => {
    setInterval(changeSlide, 5001);
  }, []);

  return (
    <div className="eventWrapper">
      <div
        style={{
          position: "relative",
          width: size.width,
          height: size.height,
          backgroundColor: "black",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "absolute", ...position }}>
          {events.map((event) => (
            <Odds key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default App;
