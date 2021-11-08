var input = document.querySelector("#search");
var form = document.querySelector(".form");
var icon = document.querySelector(".weather-icon");
var temp = document.querySelector(".temperature value p");
var summary = document.querySelector(".temperature-description p");
var submitEl = document.querySelector("#search-btn");
const kelvin = 273;

const key = "bae57e4cda117c8b12b4f90bdd90b054";
const base = "https://api.openweathermap.org/data/2.5/";

// get name of city from input
submitEl.addEventListener("click", function(){
    console.log(input.value);
    getWeather(input.value);
})

// research open weather API, endpoint and parameters
function getWeather(city) {
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key + '&units=imperial')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    var weatherCard = $("<div>").addClass("card");
    var cardTitle = $("<h3>").addClass("card-title").text(myJson.name);
    var tempEl = $("<p>").addClass("card-text").text(myJson.main.temp);
    var imgEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + myJson.weather[0].icon + ".png");
    $(".weather-container").append(weatherCard.append(cardTitle.append(imgEl), tempEl));
  });
}

// console.log(results) from API