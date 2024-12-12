import React, { useState } from "react";
import "./index.css";

function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const API_KEY = "da29541012aafb13be0fff59a3d398b0";

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        alert(data.message);
        return;
      }

      setWeatherData(data);
      setSearchHistory((prev) => [
        { user: "Anonymous", city, weather: data.main },
        ...prev,
      ]);
      setCity("");
    } catch (error) {
      alert("Failed to fetch weather data. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Weather App</h1>
      </header>
      <main className="main-content">
        <section className="search-section">
          <input
            type="text"
            className="input-box"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-btn" onClick={fetchWeather}>
            Search Weather
          </button>
        </section>

        {weatherData && (
          <section className="weather-section">
            <h2>Weather in {weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Condition: {weatherData.weather[0].description}</p>
            <p>Wind Speed: {weatherData.wind.speed} km/h</p>
          </section>
        )}

        <section className="history-section">
          <h2>Search History</h2>
          {searchHistory.length === 0 ? (
            <p className="no-history">No searches yet.</p>
          ) : (
            <div className="history-list">
              {searchHistory.map((item, index) => (
                <div key={index} className="history-item">
                  <p>
                    <strong>User:</strong> {item.user}
                  </p>
                  <p>
                    <strong>City:</strong> {item.city}
                  </p>
                  <p>
                    <strong>Temperature:</strong> {item.weather.temp}°C
                  </p>
                  <p>
                    <strong>Condition:</strong> {item.weather.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
