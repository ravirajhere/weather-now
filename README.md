# 🌤️ Weather Now

A fast, clean weather app that shows current conditions, hourly forecast, 7-day forecast, and air quality — with smart plain-language suggestions. No API key, no backend, 100% client-side.

**Version 2.0** — now with 7-day forecast, hourly forecast, AQI, favorite cities, and dynamic weather-based UI.

## 🌐 Live Demo
👉 **https://weather-now-rj.vercel.app**

## 💡 Why I Built This
Most weather apps throw raw numbers at you — 32°C, 65% humidity, 12 km/h wind. Users don't want numbers. They want answers:
- *Should I carry an umbrella?*
- *Is the air safe to breathe today?*
- *What's the weather going to be like this week?*

Weather Now answers those questions cleanly — with a smart suggestion, a real forecast, an AQI badge, and no clutter. Built with Indian cities and Indian weather conditions in mind.

## ✨ Features

### Current Weather
- **Search any city** — Indian cities work great, the API is global
- **Auto-load** — opens with Patna's weather by default
- **Live data** — temperature, condition, wind speed, humidity
- **Smart suggestions** — "Carry an umbrella", "Wear a jacket", "Stay indoors"
- **Weather code translation** — no cryptic numbers, just plain English
- **Day/Night badge** — shows whether it's daytime or night at the city

### Forecasts
- **Hourly forecast** — next 24 hours, horizontally scrollable
- **7-day forecast** — daily high/low temperature + condition
- **Highlighted cards** — "Now" and "Today" stand out visually

### Air Quality
- **US AQI** — real-time air quality index
- **Color-coded badge** — Good / Moderate / Unhealthy / Hazardous
- **Category label** — plain English description of air quality level

### Personalization
- **Favorite cities** — save cities you check often
- **Quick switch** — click a saved chip to load that city
- **Persistent storage** — favorites saved in localStorage
- **Dynamic UI** — background changes based on weather (clear, rain, storm, snow, fog) and time of day

### Technical
- **No API key needed** — uses Open-Meteo (free, open, no signup)
- **100% client-side** — no backend, no tracking, no signup
- **Loading skeleton** — smooth shimmer while data loads
- **Keyboard shortcut** — press Enter in the search box to fetch weather
- **Fully responsive** — mobile + desktop

## 🛠️ Tech Stack
- **HTML5**
- **CSS3** — gradients, dynamic backgrounds via data attributes, keyframe animations, responsive grid
- **JavaScript (Vanilla)** — async/await, fetch API, JSON handling, localStorage
- **Open-Meteo API** — geocoding + weather forecast + air quality
- **Vercel** — deployment

## 📂 Project Structure

weather-now/
├── index.html
├── style.css
├── script.js
└── README.md

## 🌐 APIs Used (All Free, No Key)

| API | Purpose |
|-----|---------|
| Open-Meteo Geocoding | Convert city name → coordinates |
| Open-Meteo Forecast | Current + hourly + daily weather |
| Open-Meteo Air Quality | US AQI + PM2.5 + PM10 |

## 🚀 How to Run Locally
1. Clone the repo:
   git clone https://github.com/ravirajhere/weather-now.git
2. Navigate into the folder:
   cd weather-now
3. Open index.html in your browser. That's it — no installation needed.

## 🧠 What I Learned From This Project
- Chaining multiple API calls in sequence (geocoding → weather → air quality)
- Working with time-series data (hourly arrays, daily arrays from the API)
- Building dynamic UI using CSS data attributes — `body[data-weather="rain"]`
- Persisting user preferences with localStorage (favorites)
- Weather code mapping (WMO codes → human-readable text + emoji)
- Loading skeletons for better perceived performance
- Responsive horizontal scrolling for hourly cards
- AQI categorization (US EPA scale) and color-coding

## 🔮 Future Improvements
- Auto-detect user's location using the Geolocation API
- Sunrise / sunset visualization
- Weather alerts for extreme conditions
- Historical data — compare with yesterday
- Multi-language support
- Widget mode — embed in other websites

## 👤 Author
**Ravi Raj**
1st year BTech student, Patna
- GitHub: [@ravirajhere](https://github.com/ravirajhere)
- Portfolio: [ravirajhere-portfolio.vercel.app](https://ravirajhere-portfolio.vercel.app)

## 📄 License
Code open for reference and learning.
