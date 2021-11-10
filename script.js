var input = document.querySelector("#search");
var form = document.querySelector(".form");
var submitEl = document.querySelector("#search-btn");

const key = "bae57e4cda117c8b12b4f90bdd90b054";


// use weather API to get coordinates of entered city
function getLocation(city) {
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key + '&units=imperial')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var coordsEl = 'lat=' + data.coord.lat + '&lon=' + data.coord.lon;
    getForecast(coordsEl);
    getCurrentForescast(coordsEl);
  });
}

// create function to pull current forecast with the lat/lon of the entered city
function getCurrentForescast(coordsEl) {
  fetch('https://api.openweathermap.org/data/2.5/onecall?' + coordsEl + '&exclude=hourly,minutely&appid=' + key + '&units=imperial')
  .then(function(response) {
    response.json().then(function(data){

    // create div card to hold forecast
    var weatherCard = $("<div>").addClass("card");

    //create elements to obtain necessary data
    var cardTitle = $("<h2>").addClass("card-title").text(input.value + " (" + new Date(data.current.dt*1000).toLocaleDateString("en-US") + ")");
    var tempEl = $("<p>").addClass("card-text").text("Temp: " + data.current.temp + "°F");
    var imgEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png");
    var windEl = $("<p>").addClass("card-text").text("Wind: " + data.current.wind_speed + " mph");
    var humidityEl = $("<p>").addClass("card-text").text("Humidity: " + data.current.humidity + " %");
    var index = $("<span>").text(data.current.uvi);
    var uvIndexText = $("<p>").addClass("card-text").text("UV Index: ");

    // created loop to change class based on UV values
    if (data.current.uvi > 5 ) {
      $(index).addClass("danger");
      $(index).removeClass("success");
    } if (data.current.uvi > 2 && data.current.uvi < 5){
      $(index).addClass("caution"); 
      $(index).removeClass("success");  
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
  $(".forecast-title").removeClass("d-none");

// create loop to get 5-day forecast
  for(let i=1; i <= 5; i++){
  fetch('https://api.openweathermap.org/data/2.5/onecall?' + coordsEl + '&exclude=hourly,minutely&appid=' + key + '&units=imperial')
  .then(function(response) {
   
    response.json().then(function(forecast){
    // create card to hold each day's data
    var dailyForecast = $("<div>").addClass("card col-2 forecast text-light me-5");

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


// clear history from previous search 


// create buttons from previous search
var pastSearch = function(){
 
  console.log(pastSearch)

//   pastSearchEl = document.createElement("button");
//   pastSearchEl.textContent = pastSearch;
//   pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
//   pastSearchEl.setAttribute("data-city",pastSearch)
//   pastSearchEl.setAttribute("type", "submit");

//   pastSearchButtonEl.prepend(pastSearchEl);
 }

// get name of city from input
submitEl.addEventListener("click", function(){
  getLocation(input.value);
  localStorage.setItem("city", input.value);
});
