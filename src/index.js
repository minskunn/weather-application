function handleSearchSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
