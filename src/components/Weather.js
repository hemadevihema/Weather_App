import React from 'react';
import './Weather.css';
import Lottie from 'lottie-react';
import Sunny from '../assets/animations/sunnyAnimation.json';
import Rainy from '../assets/animations/rainyAnimation.json';
import Cloudy from '../assets/animations/cloudyAnimation.json';
import Snow from '../assets/animations/snowAnimation.json';
import Windy from '../assets/animations/windyAnimation.json';

const getAnimation = (data) => {
  const desc = data.weather[0].description.toLowerCase();
  const temp = data.main.temp;

  if (desc.includes('snow') || temp < -10) return Snow;
  if (desc.includes('rain') || desc.includes('drizzle')) return Rainy;
  if (desc.includes('cloud') || desc.includes('overcast')) return Cloudy;
  if (desc.includes('wind')) return Windy;
  return Sunny;
};

export default function Weather({ data }) {
  const anim = getAnimation(data);

  return (
    <div className="weather-card">
      <div className="weather-top">
        <Lottie animationData={anim} className="weather-anim" loop autoplay />
        <div className="temp">
          {Math.round(data.main.temp)}°C
          <span className="weather-main">{data.weather[0].main}</span>
        </div>
      </div>
      <div className="weather-bottom">
        <div>💧 Humidity: {data.main.humidity}%</div>
        <div>🌬 Wind: {data.wind.speed} m/s</div>
        <div>📍 Location: {data.name}</div>
        <div>🔺 Feels like: {Math.round(data.main.feels_like)}°C</div>
      </div>
    </div>
  );
}