const apiKey = "b3e763ddcf03adece92e2ca5e78b5845";

const searchBox = document.getElementById("input-text");
const searchBtn = document.getElementById("search-btn");
const cityToSearch = document.querySelector("#city-name");
const weatherInfoContainer = document.querySelector(".weather-conatiner");
const errorMessage = document.querySelector(".error");
const weatherImg = document.getElementById("weather-img");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".hummity");
const wind = document.querySelector(".wind");

async function checkWeather(city) {
  try {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiURL);

    if (response.status === 404) {
      throw new Error("City not found");
    }

    const data = await response.json();

    errorMessage.classList.add("hide");

    clearWeatherInfo();

    cityToSearch.innerHTML = data.name;
    temp.innerHTML = `${Math.round(data.main.temp)} ℃`;
    humidity.innerHTML = `${data.main.humidity} %`;
    wind.innerHTML = `${data.wind.speed} km/h`;

    const presentWeather = data.weather[0].main.toLowerCase();
    weatherImg.src = `./images/${presentWeather}.png`;
  } catch (error) {
    errorMessage.innerHTML =
      error.message || "An error occurred. Please try again later.";
    errorMessage.classList.remove("hide");
    weatherInfoContainer.classList.add("hide");
  }
}

searchBtn.addEventListener("click", function (event) {
  const cityName = searchBox.value.trim();

  weatherInfoContainer.classList.add("hide");

  if (cityName !== "") {
    checkWeather(cityName);
    weatherInfoContainer.classList.remove("hide");
    searchBox.value = "";
  } else {
    errorMessage.innerHTML = "Please enter a valid city name.";
    errorMessage.classList.remove("hide");
  }
});

function clearWeatherInfo() {
  cityToSearch.innerHTML = "";
  temp.innerHTML = "";
  humidity.innerHTML = "";
  wind.innerHTML = "";
  weatherImg.src = "";
}
