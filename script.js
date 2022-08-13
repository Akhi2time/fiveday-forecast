var APIKey = "5723b0246625918900b6bc6ccce0a81d"
var city = "";
var currentDate = "";
var tempF = "";
var humidityValue = "";
var windSpeed = "";
var minTempK = "";
var maxTempK = "";
var minTempF = "";
var maxTempF = "";
var dayhumidity = "";
var currentWeatherIconCode = "";
var currentWeatherIconUrl = "";
var iconcode = "";
var iconurl = "";
var country = "";

var searchedCitieslist = [];

var getsearchedCitieslist = JSON.parse(localStorage.getItem("searched-cities"));
if (getsearchedCitieslist !== null) {
  getsearchedCitieslist.forEach(function(city) {city.toUpperCase();});
  listOfSearchedCities = getsearchedCitieslist;  
}