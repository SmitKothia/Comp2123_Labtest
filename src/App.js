import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


const App = () => {
  const [weather, setWeather] = useState(null); // State for weather data
  const [city, setCity] = useState("Toronto"); // State for city input
  const API_KEY = "67b9001e9888a99676e20b62a6675920"; // Replace with your actual API key

  // Function to fetch weather data
  const fetchWeather = (city) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then((response) => setWeather(response.data))
      .catch((error) => console.error("Error fetching the weather data:", error));
  };

  useEffect(() => {
    fetchWeather(city); // Fetch weather data on component load
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => fetchWeather(city)}>Search</button>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}K</p>
          <p>Condition: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
};

export default App;
