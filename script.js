
const apiKey = 'bcecc2080bccc3bf87b027571c551df3'; // Replace with your OpenWeatherMap API Key
const city = 'Ho Chi Minh City'; // Replace with your city name
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const messageUrl = 'content.json'; // Path to your message file

function updateTimeAndDate() {
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  dateElement.textContent = `Date: ${date}`;
  timeElement.textContent = `Time: ${time}`;
}

function updateWeather() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      const tempElement = document.getElementById("temperature");
      const humidityElement = document.getElementById("humidity");
      const windElement = document.getElementById("wind");

      tempElement.textContent = `Current Temperature: ${temp}°C`;
      humidityElement.textContent = `Humidity: ${humidity}%`;
      windElement.textContent = `Wind Speed: ${windSpeed} m/s`;
    })
    .catch(error => {
      console.error("Error fetching the weather data:", error);
      document.getElementById("temperature").textContent = "Failed to fetch temperature.";
      document.getElementById("humidity").textContent = "Failed to fetch humidity.";
      document.getElementById("wind").textContent = "Failed to fetch wind speed.";
    });
}

function updateCustomMessage() {
  fetch(messageUrl)
    .then(response => response.json())
    .then(data => {
      const messageElement = document.getElementById("custom-message");
      messageElement.textContent = data.message;
    })
    .catch(error => {
      console.error("Error fetching the message:", error);
      document.getElementById("custom-message").textContent = "Failed to load message.";
    });
}

setInterval(updateTimeAndDate, 1000);
updateTimeAndDate();
updateWeather();
updateCustomMessage();

document.querySelector('.update-btn').addEventListener('click', updateWeather);
