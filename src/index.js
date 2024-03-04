function refreshWeatherData(response) {
  let temperatureNow = document.querySelector("#temperature");
  let cityElement = document.querySelector("#current-city");
  temperatureNow.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
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
