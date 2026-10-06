# 🌤️ Weather Now

A fast, simple weather app that shows current weather for any city — with a human-friendly suggestion. No API key needed, no backend, runs entirely in the browser.

## 🌐 Live Demo
👉 **https://ravirajhere-weather.vercel.app**

## 💡 Why I Built This
Most weather apps just throw numbers at you — 32°C, 65% humidity, 12 km/h wind. But regular users don't care about raw numbers. They want to know: *Should I carry an umbrella? Is it safe to go out?*

Weather Now solves that by adding a plain-language suggestion on top of the weather data — built specifically with Indian cities and Indian weather conditions in mind.

## ✨ Features
- **Search any city** — Indian cities work great, but the API is global
- **Live weather data** — temperature, condition, wind speed, humidity
- **Smart suggestions** — "Carry an umbrella", "Stay indoors", "Wear a jacket"
- **Weather codes translated** — no cryptic numbers, just plain English
- **No API key needed** — uses Open-Meteo, completely free and open
- **100% client-side** — no backend, no tracking, no signup

## 🛠️ Tech Stack
- HTML5
- CSS3
- JavaScript (Vanilla) — async/await, fetch API, JSON handling
- Open-Meteo API (geocoding + forecast)
- Vercel (Deployment)

## 📂 Project Structure

weather-now/
├── index.html
├── style.css
├── script.js
└── README.md

## 🚀 How to Run Locally
1. Clone the repo:
   git clone https://github.com/ravirajhere/weather-now.git
2. Navigate into the folder:
   cd weather-now
3. Open index.html in your browser. That's it — no installation needed.

## 🧠 What I Learned From This Project
- Working with real external APIs using fetch and async/await
- Chaining two API calls (geocoding → weather) in sequence
- Parsing and displaying JSON data dynamically
- Handling API errors and empty results gracefully
- Translating raw weather codes into user-friendly text

## 🔮 Future Improvements
- 7-day forecast view
- Auto-detect user's location using the browser Geolocation API
- Save favourite cities in localStorage
- Dark/light mode toggle
- Weather-based background images

## 👤 Author
**Ravi Raj**  
GitHub: [@ravirajhere](https://github.com/ravirajhere)
