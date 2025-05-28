import React, { useEffect, useState } from 'react';
import './App.css';
import Weather from './Weather';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [locationGranted, setLocationGranted] = useState(false);

  const fetchWeather = async (query) => {
    const apiKey = '6dd6278065e61d119cd6fb3ddd54ccb5'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchByLocation = (lat, lon) => {
    const apiKey = '6dd6278065e61d119cd6fb3ddd54ccb5'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setWeatherData(data);
        setCity(data.name);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationGranted(true);
        fetchByLocation(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        setLocationGranted(false);
      }
    );
  }, []);

  return (
    <div className="app">
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Go</button>
      </form>
      {weatherData ? (
        <Weather data={weatherData} />
      ) : (
        <div className="message">🌧 No weather data. Try a valid city.</div>
      )}
      <footer className="credits">
        Made with ☀ + 🌧 by <strong> Hemz</strong>
      </footer>
    </div>
  );
}