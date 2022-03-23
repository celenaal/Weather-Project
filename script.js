let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let todayDate = `${day}`;
let current = document.querySelector("#currentDate");
current.innerHTML = `${todayDate}`;

function timeDisplay() {
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    return `${hour}:0${minute}`;
  } else {
    return `${hour}:${minute}`;
  }
}
let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = timeDisplay();

let place = document.querySelector("#search-form");
place.addEventListener("submit", locationInput);

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (days) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
                <div class="weather-forecast-date">${days}</div>
                <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="40">
                <div class="weather-forecast-temperatures"> <span class="weather-forecast-temperature-max">18° </span><span class="weather-forecast-temperature-min"> 12°</span></div>
          </div>`;
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

//. Part 2

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "787d6bcc78e36ba4256b2abd678854b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);
  document.querySelector("#location").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#main-tempt").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function locationInput(event) {
  event.preventDefault();
  let placeInput = document.querySelector("#place-input");
  let apiKey = "787d6bcc78e36ba4256b2abd678854b6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${placeInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiKey = "787d6bcc78e36ba4256b2abd678854b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let showTemperature = document.querySelector("#main-tempt");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = celsiusTemperature * (9 / 5) + 32;
  showTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showcelsiusTemp(event) {
  event.preventDefault();
  let showTemperature = document.querySelector("#main-tempt");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  showTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let currentLoc = document.querySelector("#current-location");
currentLoc.addEventListener("click", currentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showcelsiusTemp);

displayForecast();
