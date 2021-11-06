const notification = document.querySelector(".notification");
const iconEl = document.querySelector(".weather-container");
const tempEl = document.querySelector(".temperature value p");
const descripEl = document.querySelector(".temperature-description p");
const locEl = document.querySelector(".location p");

const api = {
    key: "bae57e4cda117c8b12b4f90bdd90b054",
    base: "https://api.openweathermap.org/data/2.5/"
}