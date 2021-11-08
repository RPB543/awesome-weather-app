var input = document.querySelector("#search");
var form = document.querySelector(".form");
var submitEl = document.querySelector("#search-btn");


const key = "bae57e4cda117c8b12b4f90bdd90b054";

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
  .then(function(data) {
    console.log(data);
    var weatherCard = $("<div>").addClass("card");
    var cardTitle = $("<h3>").addClass("card-title").text(data.name);
    // var dateEl = $("<h3>").addClass("card-title").text(data.dt).toLocaleDateString("en-US");
    var tempEl = $("<p>").addClass("card-text").text("Temp: " + data.main.temp + "°F");
    var imgEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    var windEl = $("<p>").addClass("card-text").text("Wind: " + data.wind.speed + " mph");
    var humidityEl = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + " %");
    $(".weather-container").append(weatherCard.append(cardTitle.append(imgEl), tempEl, windEl, humidityEl));
  });
}
function getCoordinates() {

}
