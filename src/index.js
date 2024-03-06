function refreshWeatherData(response) {
  let temperatureNow = document.querySelector("#temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  let date = new Date(response.data.time * 1000);
  temperatureNow.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}% `;
  windSpeedElement.innerHTML = `${response.data.wind.speed}m/s`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
}

function formatDate(date) {
  let minutes = date.getMinutes(); //.toString().padStart(2, "0");
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let comingDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = "";

  comingDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="weekday">${day}<br />
            <img
              class="forecast-icon"
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
              alt="sunny"
            />
            <div class="temperature-high">
              20
              <span class="temperature-low">10</span>
            </div>
          </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(city) {
  let apiKey = "04e13864eb3t2f8af00833563db7ofc6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let cityElement = document.querySelector("#current-city");
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Oslo");
displayForecast();
