var input = document.querySelector("#search");
var form = document.querySelector(".form");
var submitEl = document.querySelector("#search-btn");


const key = "bae57e4cda117c8b12b4f90bdd90b054";

// get name of city from input
submitEl.addEventListener("click", function(){
  getWeather(input.value);
});

// research open weather API, endpoint and parameters
function getWeather(city) {
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key + '&units=imperial')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    var coordsEl = 'lat=' + data.coord.lat + '&lon=' + data.coord.lon;
    getForecast(coordsEl);
    getUvIndex(coordsEl);
  });
  input.textContent = input
}

function getUvIndex(coordsEl) {
  fetch('https://api.openweathermap.org/data/2.5/onecall?' + coordsEl + '&exclude=hourly,minutely&appid=' + key + '&units=imperial')
  .then(function(response) {
    response.json().then(function(data){
    var weatherCard = $("<div>").addClass("card");
    var cardTitle = $("<h3>").addClass("card-title").text(input.value + " (" + new Date(data.current.dt*1000).toLocaleDateString("en-US") + ")");
    var tempEl = $("<p>").addClass("card-text").text("Temp: " + data.current.temp + "°F");
    var imgEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png");
    var windEl = $("<p>").addClass("card-text").text("Wind: " + data.current.wind_speed + " mph");
    var humidityEl = $("<p>").addClass("card-text").text("Humidity: " + data.current.humidity + " %");
   var uvIndex = $("<p>").addClass("card-text").text("UV Index: " + data.current.uvi);
   $(".weather-container").append(weatherCard.append(cardTitle.append(imgEl), tempEl, windEl, humidityEl, uvIndex))
});
  })
 return getUvIndex;
  }

// create function to pull 5 day forecast
function getForecast(coordsEl) {

// create loop to get 5-day forecast
  for(let i=1; i <= 5; i++){
  fetch('https://api.openweathermap.org/data/2.5/onecall?' + coordsEl + '&exclude=hourly,minutely&appid=' + key + '&units=imperial')
  .then(function(response) {
   
    response.json().then(function(forecast){
      console.log(forecast)
    // create card to hold each day's data
    var dailyForecast = $("<div>").addClass("card col-2 w-5");

    // create elements for date, temp, icon, wind and humidity
    var cardTitle = $("<h4>").addClass("card-title").text(new Date(forecast.daily[i].dt*1000).toLocaleDateString("en-US"));
    var tempEl = $("<p>").addClass("card-text").text("Temp: " + forecast.daily[i].temp.day + "°F");
    var imgEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + forecast.daily[i].weather[0].icon + ".png");
    var windEl = $("<p>").addClass("card-text").text("Wind: " + forecast.daily[i].wind_speed + " mph");
    var humidityEl = $("<p>").addClass("card-text").text("Humidity: " + forecast.daily[i].humidity + " %");
  
    //append the elements to the forecast container
    $(".weather-forecast").append(dailyForecast.append(cardTitle.append(imgEl), tempEl, windEl, humidityEl));
         });
    });
  };
return getForecast;
}