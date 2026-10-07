/* ============================================
   Weather Now — Logic
   Phase 4 Final: Current + Hourly + Daily + AQI + Favorites + Dynamic UI
   ============================================ */

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const status = document.getElementById("status");
const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const suggestion = document.getElementById("suggestion");
const aqiEl = document.getElementById("aqi");
const aqiBadge = document.getElementById("aqiBadge");
const aqiQuality = document.getElementById("aqiQuality");
const favBtn = document.getElementById("favBtn");
const dayNightBadge = document.getElementById("dayNightBadge");
const skeleton = document.getElementById("skeleton");

const hourlySection = document.getElementById("hourlySection");
const hourlyList = document.getElementById("hourlyList");
const dailySection = document.getElementById("dailySection");
const dailyList = document.getElementById("dailyList");

const favoritesBar = document.getElementById("favoritesBar");
const favoritesList = document.getElementById("favoritesList");

let currentCity = "";

// ============================================
// WEATHER CODE → EMOJI + TEXT + TYPE
// ============================================
function getCondition(code) {
  if (code === 0) return { icon: "☀️", text: "Clear sky", type: "clear" };
  if (code <= 3) return { icon: "⛅", text: "Partly cloudy", type: "cloudy" };
  if (code <= 48) return { icon: "🌫️", text: "Foggy", type: "fog" };
  if (code <= 57) return { icon: "🌦️", text: "Drizzle", type: "rain" };
  if (code <= 67) return { icon: "🌧️", text: "Rain", type: "rain" };
  if (code <= 77) return { icon: "❄️", text: "Snow", type: "snow" };
  if (code <= 82) return { icon: "🌧️", text: "Rain showers", type: "rain" };
  if (code <= 86) return { icon: "🌨️", text: "Snow showers", type: "snow" };
  return { icon: "⛈️", text: "Thunderstorm", type: "storm" };
}

// ============================================
// AQI CATEGORY
// ============================================
function getAQICategory(aqi) {
  if (aqi <= 50) return { label: "Good", cls: "good" };
  if (aqi <= 100) return { label: "Moderate", cls: "moderate" };
  if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", cls: "unhealthy-sensitive" };
  if (aqi <= 200) return { label: "Unhealthy", cls: "unhealthy" };
  if (aqi <= 300) return { label: "Very Unhealthy", cls: "very-unhealthy" };
  return { label: "Hazardous", cls: "hazardous" };
}

// ============================================
// SUGGESTION
// ============================================
function getSuggestion(code, tempC, windKmh) {
  if (code >= 51 && code <= 67) return "☔ It's raining — carry an umbrella.";
  if (code >= 80 && code <= 82) return "☔ Rain likely — keep an umbrella handy.";
  if (code >= 95) return "⛈️ Thunderstorm — better to stay indoors.";
  if (tempC >= 40) return "🥵 Very hot — drink water, avoid the sun.";
  if (tempC >= 35) return "🌡️ Hot — wear light clothes.";
  if (tempC <= 10) return "🧥 Cold — wear a jacket.";
  if (windKmh >= 30) return "💨 Strong winds — be careful.";
  return "😊 Weather looks fine — you can head out.";
}

// ============================================
// TIME / DAY FORMAT
// ============================================
function formatHour(isoTime, index) {
  if (index === 0) return "Now";
  const hour = new Date(isoTime).getHours();
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12} ${ampm}`;
}

function formatDay(isoDate, index) {
  if (index === 0) return "Today";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

// ============================================
// DYNAMIC UI — Body data attributes
// ============================================
function updateDynamicUI(weatherType) {
  document.body.setAttribute("data-weather", weatherType);

  const now = new Date();
  const currentHour = now.getHours();
  const isDay = currentHour >= 6 && currentHour < 18;
  document.body.setAttribute("data-time", isDay ? "day" : "night");

  if (dayNightBadge) {
    dayNightBadge.textContent = isDay ? "☀️ Daytime" : "🌙 Night";
    dayNightBadge.style.display = "inline-block";
  }
}

// ============================================
// RENDER HOURLY
// ============================================
function renderHourly(hourly) {
  hourlyList.innerHTML = "";
  const now = new Date();
  const currentHour = now.getHours();
  let count = 0;

  for (let i = 0; i < hourly.time.length && count < 24; i++) {
    const time = new Date(hourly.time[i]);
    if (time.getHours() < currentHour && time.toDateString() === now.toDateString()) continue;

    const cond = getCondition(hourly.weather_code[i]);
    const tempC = Math.round(hourly.temperature_2m[i]);

    const card = document.createElement("div");
    card.className = `hourly-card ${count === 0 ? "now" : ""}`;
    card.innerHTML = `
      <span class="hourly-time">${formatHour(hourly.time[i], count)}</span>
      <span class="hourly-icon">${cond.icon}</span>
      <span class="hourly-temp">${tempC}°</span>
    `;
    hourlyList.appendChild(card);
    count++;
  }
  hourlySection.style.display = "block";
}

// ============================================
// RENDER DAILY
// ============================================
function renderDaily(daily) {
  dailyList.innerHTML = "";

  for (let i = 0; i < daily.time.length && i < 7; i++) {
    const cond = getCondition(daily.weather_code[i]);
    const tempHigh = Math.round(daily.temperature_2m_max[i]);
    const tempLow = Math.round(daily.temperature_2m_min[i]);

    const card = document.createElement("div");
    card.className = `daily-card ${i === 0 ? "today" : ""}`;
    card.innerHTML = `
      <span class="daily-day">${formatDay(daily.time[i], i)}</span>
      <span class="daily-icon">${cond.icon}</span>
      <span class="daily-condition">${cond.text}</span>
      <span class="daily-temps">
        <span class="daily-temp-high">${tempHigh}°</span>
        <span class="daily-temp-low">${tempLow}°</span>
      </span>
    `;
    dailyList.appendChild(card);
  }
  dailySection.style.display = "block";
}

// ============================================
// FAVORITES
// ============================================
function getFavorites() {
  try {
    const saved = localStorage.getItem("weatherFavorites");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function saveFavorites(favs) {
  localStorage.setItem("weatherFavorites", JSON.stringify(favs));
}

function isFavorite(city) {
  return getFavorites().some(f => f.toLowerCase() === city.toLowerCase());
}

function toggleFavorite(city) {
  let favs = getFavorites();
  if (isFavorite(city)) {
    favs = favs.filter(f => f.toLowerCase() !== city.toLowerCase());
  } else {
    favs.push(city);
  }
  saveFavorites(favs);
  renderFavorites();
  updateFavBtn();
}

function updateFavBtn() {
  if (!currentCity) return;
  if (isFavorite(currentCity)) {
    favBtn.textContent = "★";
    favBtn.classList.add("active");
    favBtn.setAttribute("aria-label", "Remove from favorites");
  } else {
    favBtn.textContent = "☆";
    favBtn.classList.remove("active");
    favBtn.setAttribute("aria-label", "Save to favorites");
  }
}

function renderFavorites() {
  const favs = getFavorites();

  if (favs.length === 0) {
    favoritesBar.style.display = "none";
    return;
  }

  favoritesBar.style.display = "flex";
  favoritesList.innerHTML = "";

  favs.forEach(city => {
    const chip = document.createElement("button");
    chip.className = "fav-chip";
    chip.type = "button";
    chip.innerHTML = `
      <span>${city}</span>
      <span class="fav-chip-remove" data-city="${city}" aria-label="Remove">✕</span>
    `;

    chip.addEventListener("click", (e) => {
      if (e.target.classList.contains("fav-chip-remove")) {
        e.stopPropagation();
        toggleFavorite(city);
        return;
      }
      cityInput.value = city;
      getWeather(city);
    });

    favoritesList.appendChild(chip);
  });
}

// ============================================
// AQI
// ============================================
async function fetchAQI(lat, lon) {
  try {
    const res = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm2_5,pm10`
    );
    const data = await res.json();
    return data.current;
  } catch (err) {
    console.error("AQI fetch failed:", err);
    return null;
  }
}

function renderAQI(aqiData) {
  if (!aqiData || aqiData.us_aqi == null) {
    aqiEl.textContent = "—";
    aqiBadge.style.display = "none";
    return;
  }
  const aqi = Math.round(aqiData.us_aqi);
  const cat = getAQICategory(aqi);
  aqiEl.textContent = aqi;
  aqiQuality.textContent = `${cat.label} · US AQI ${aqi}`;
  aqiBadge.className = `aqi-badge ${cat.cls}`;
  aqiBadge.style.display = "block";
}

// ============================================
// MAIN — GET WEATHER
// ============================================
async function getWeather(city) {
  searchBtn.disabled = true;
  status.textContent = "Loading...";
  status.className = "status";
  weatherCard.classList.add("hidden");
  hourlySection.style.display = "none";
  dailySection.style.display = "none";

  if (skeleton) skeleton.style.display = "block";

  try {
    // Step 1: Geocoding
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      status.textContent = "City not found. Check spelling.";
      status.className = "status error";
      return;
    }

    const place = geoData.results[0];
    const lat = place.latitude;
    const lon = place.longitude;

    // Step 2: Weather (current + hourly + daily)
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
      `&hourly=temperature_2m,weather_code` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
      `&timezone=auto&forecast_days=7`
    );
    const weatherData = await weatherRes.json();
    const current = weatherData.current;
    const cond = getCondition(current.weather_code);

    // Step 3: AQI
    const aqiData = await fetchAQI(lat, lon);

    currentCity = place.name;

    // Display current
    cityName.textContent = `${place.name}, ${place.country}`;
    temp.textContent = `${Math.round(current.temperature_2m)}°C`;
    condition.textContent = cond.text;
    wind.textContent = `${current.wind_speed_10m} km/h`;
    humidity.textContent = `${current.relative_humidity_2m}%`;
    suggestion.textContent = getSuggestion(
      current.weather_code,
      current.temperature_2m,
      current.wind_speed_10m
    );

    renderAQI(aqiData);
    updateFavBtn();
    updateDynamicUI(cond.type);

    weatherCard.classList.remove("hidden");

    if (weatherData.hourly) renderHourly(weatherData.hourly);
    if (weatherData.daily) renderDaily(weatherData.daily);

    status.textContent = "";
  } catch (error) {
    status.textContent = "Something went wrong. Check your internet.";
    status.className = "status error";
    console.error(error);
  } finally {
    searchBtn.disabled = false;
    if (skeleton) skeleton.style.display = "none";
  }
}

// ============================================
// EVENTS
// ============================================
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return;
  getWeather(city);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});

favBtn.addEventListener("click", () => {
  if (currentCity) toggleFavorite(currentCity);
});

// ============================================
// INIT — Auto-load Patna
// ============================================
window.addEventListener("load", () => {
  renderFavorites();
  cityInput.value = "Patna";
  getWeather("Patna");
});
