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

// Weather code ko text mein badalne ke liye
function getCondition(code) {
  if (code === 0) return "Clear sky ☀️";
  if (code <= 3) return "Partly cloudy ⛅";
  if (code <= 48) return "Foggy 🌫️";
  if (code <= 57) return "Drizzle 🌦️";
  if (code <= 67) return "Rain 🌧️";
  if (code <= 77) return "Snow ❄️";
  if (code <= 82) return "Rain showers 🌧️";
  if (code <= 86) return "Snow showers 🌨️";
  return "Thunderstorm ⛈️";
}

// Suggestion logic
function getSuggestion(code, tempC, windKmh) {
  if (code >= 51 && code <= 67) return "☔ Barish ho rahi hai — umbrella le lo.";
  if (code >= 80 && code <= 82) return "☔ Barish ke chances hain — umbrella saath rakho.";
  if (code >= 95) return "⛈️ Thunderstorm — ghar pe rehna better hai.";
  if (tempC >= 40) return "🥵 Bahut garmi hai — paani peete raho, dhoop se bacho.";
  if (tempC >= 35) return "🌡️ Garmi hai — halke kapde pehno.";
  if (tempC <= 10) return "🧥 Thand hai — jacket pehno.";
  if (windKmh >= 30) return "💨 Tez hawa chal rahi hai — savdhan raho.";
  return "😊 Mausam theek hai — bahar nikal sakte ho.";
}

// Main function
async function getWeather(city) {
  searchBtn.disabled = true;
  status.textContent = "Loading...";
  status.className = "status";
  weatherCard.classList.add("hidden");

  try {
    // Step 1: City ka coordinates nikalo
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      status.textContent = "City nahi mili. Spelling check karo.";
      status.className = "status error";
      return;
    }

    const place = geoData.results[0];
    const lat = place.latitude;
    const lon = place.longitude;

    // Step 2: Weather laao
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
    );
    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    // Step 3: Display karo
    cityName.textContent = `${place.name}, ${place.country}`;
    temp.textContent = `${current.temperature_2m}°C`;
    condition.textContent = getCondition(current.weather_code);
    wind.textContent = `${current.wind_speed_10m} km/h`;
    humidity.textContent = `${current.relative_humidity_2m}%`;
    suggestion.textContent = getSuggestion(
      current.weather_code,
      current.temperature_2m,
      current.wind_speed_10m
    );

    weatherCard.classList.remove("hidden");
    status.textContent = "";
  } catch (error) {
    status.textContent = "Kuch galat ho gaya. Internet check karo.";
    status.className = "status error";
    console.error(error);
  } finally {
    searchBtn.disabled = false;
  }
}

// Events
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
