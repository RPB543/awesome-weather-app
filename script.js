var input = document.querySelector("#search");
var form = document.querySelector(".form");
var submitEl = document.querySelector("#search-btn");
var searchHistory = JSON.parse(localStorage.getItem("cities")) || [];
var historyBtns = document.querySelector("#history");
var weatherBoxes = document.querySelector(".weather-boxes");
var clearEl = document.querySelector("#clear-history");
var city = "";
var historyItem = "";
var cities = [];

const key = "bae57e4cda117c8b12b4f90bdd90b054";

// use openweather API to get coordinates of entered city
function getLocation(city) {

fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key + '&units=imperial')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var coordsEl = 'lat=' + data.coord.lat + '&lon=' + data.coord.lon;
    var cityName = data.name;
    getForecast(coordsEl);
    getCurrentForescast(coordsEl, cityName);
  });
}

// create function to pull current forecast with the lat/lon of the entered city
function getCurrentForescast(coordsEl, cityName) {
  var currentForecast = document.querySelector(".weather-container");

  fetch('https://api.openweathermap.org/data/2.5/onecall?' + coordsEl + '&exclude=hourly,minutely&appid=' + key + '&units=imperial')
  .then(function(response) {
    response.json().then(function(data){

    currentForecast.innerHTML = "";

    // create div card to hold forecast
    var weatherCard = $("<div>").addClass("card");

    //create elements to obtain necessary data
    var cardTitle = $("<h2>").addClass("card-title").text(cityName + " (" + new Date(data.current.dt*1000).toLocaleDateString("en-US") + ")");
    var tempEl = $("<p>").addClass("card-text").text("Temp: " + data.current.temp + "°F");
    var imgEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png");
    var windEl = $("<p>").addClass("card-text").text("Wind: " + data.current.wind_speed + " mph");
    var humidityEl = $("<p>").addClass("card-text").text("Humidity: " + data.current.humidity + " %");
    var index = $("<span>").text(data.current.uvi);
    var uvIndexText = $("<p>").addClass("card-text").text("UV Index: ");

    // created loop to change class based on UV values
    if (data.current.uvi > 8 ) {
      $(index).addClass("danger");
    } if (data.current.uvi > 2 && data.current.uvi < 8){
      $(index).addClass("caution"); 
    } else {
      $(index).addClass("success");
    }

   // append elements to weather container
   $(".weather-container").append(weatherCard.append(cardTitle.append(imgEl), tempEl, windEl, humidityEl, uvIndexText.append(index)))
  });
  })
 return getCurrentForescast;
  }

// create function to pull 5 day forecast
function getForecast(coordsEl) {

// remove class to show 5 day forecase title
$(".forecast-title").removeClass("d-none");

var weatherForecastEl = document.querySelector(".weather-forecast");

// create loop to get 5-day forecast
  for(let i=1; i <= 5; i++){

    //clearing old city forecast
    weatherForecastEl.innerHTML = "";

  fetch('https://api.openweathermap.org/data/2.5/onecall?' + coordsEl + '&exclude=hourly,minutely&appid=' + key + '&units=imperial')
  .then(function(response) {
   
    response.json().then(function(forecast){
    // create card to hold each day's data
    var dailyForecast = $("<div>").addClass("card col-2 forecast text-light me-5 rounded");

    // create elements for date, temp, icon, wind and humidity
    var cardTitle = $("<h4>").addClass("card-title").text(new Date(forecast.daily[i].dt*1000).toLocaleDateString("en-US"));
    var tempEl = $("<p>").addClass("card-text").text("Temp: " + forecast.daily[i].temp.day + "°F");
    var imgEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + forecast.daily[i].weather[0].icon + ".png");
    var windEl = $("<p>").addClass("card-text").text("Wind: " + forecast.daily[i].wind_speed + " mph");
    var humidityEl = $("<p>").addClass("card-text").text("Humidity: " + forecast.daily[i].humidity + " %");
  
    //append the elements to the forecast container
    $(weatherForecastEl).append(dailyForecast.append(cardTitle.append(imgEl), tempEl, windEl, humidityEl));
         });
    });
  };
return getForecast;
}

// get name of city from input and save to local storage
submitEl.addEventListener("click", function(){
  var city = input.value.trim();
  if(city){
      getLocation(city);
      searchHistory.push(city);
      localStorage.setItem("cities", JSON.stringify(searchHistory));
      renderSearchHistory();
  } else{
      alert("Please enter a city");
  }
});

// generate history buttons below the search bar
function renderSearchHistory() {
  
  //clear buttons each time page reloads/localstorage is cleared
  historyBtns.innerHTML = "";

  for (let i = 0; i < searchHistory.length; i++) {
      var historyItem = document.createElement("input");
      historyItem.setAttribute("type", "text");
      historyItem.setAttribute("readonly", true);
      historyItem.setAttribute("class", "d-grid btn btn-secondary pt-2 my-2");
      historyItem.setAttribute("style", "width: 200px")
      historyItem.setAttribute("value", searchHistory[i]);
      historyItem.addEventListener("click", function () {
          getLocation(searchHistory[i]);
          console.log(searchHistory[i]);
      })
     $(clearEl).removeClass("d-none"); 
      
     historyBtns.append(historyItem);
  }
}


// Clear History button from local storage and history buttons
clearEl.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  $(clearEl).addClass("d-none");
  renderSearchHistory();
})

