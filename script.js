let APIKey = "5723b0246625918900b6bc6ccce0a81d";
let listOfSearchedCities = [];
let searchedCities = JSON.parse(localStorage.getItem("searched-cities"));

// if there are searched cities, uppercase each searched city for cleanliness

searchedCities && searchedCities.forEach((city) => city.toUpperCase());
listOfSearchedCities = searchedCities;

$(document).ready(() => {
    if (searchedCities) {
        const lastCity = listOfSearchedCities[0];
        searchCity(lastCity);
    }
});

$("#search-btn").on("click", () => {
    event.preventDefault();
    clearDisplayedWeatherInfo()
    let cityName = $("input").val().toUpperCase().trim();
    $("#search-input").val("");
    searchCity(cityName);

    if (cityName && listOfSearchedCities[0] !== cityName) {
        listOfSearchedCities.unshift(cityName);
        localStorage.setItem("searched-cities", JSON.stringify(listOfSearchedCities));

        $("#searched-cities-list").prepend(`<a href="#" class="list-group-item" style="list-style-type: none; color: black;">
    <li>${cityName}</li>
    </a>`);
    }
});

$(document).on("click", ".list-group-item", (e) => {
    clearDisplayedWeatherInfo();
    searchCity(e.target.innerText);
});

function displayCurrentWeather(city, date, temp, humidity, windSpeed, weatherIconUrl) {
    const cardDiv = $("<div class='container border bg-light'>");
    const weatherImage = $("<img>").attr('src', weatherIconUrl);
    const cardHeader = $("<h4>").text(`${city} ${date.toString()}`);
    cardHeader.append(weatherImage);
    const temperatureEl = $("<p>").text(`Temperature: ${temp} ºF`);
    const humidityEl = $("<p>").text(`Humidity: ${humidity} %`);
    const windSpeedEl = $("<p>").text(`Wind Speed: ${windSpeed} MPH`);
    cardDiv.append(cardHeader);
    cardDiv.append(temperatureEl);
    cardDiv.append(humidityEl);
    cardDiv.append(windSpeedEl);
    $("#current-weather-conditions").append(cardDiv);
}

function displayFiveDayForecast(date, temp, windSpeed, humidity, iconUrl) {
    const cardEl = $("<div class='card'>").addClass("pl-1 bg-primary text-light");
    const cardBlockDiv = $("<div>").attr("class", "card-block");
    const cardTitleDiv = $("<div>").attr("class", "card-block");
    const cardTextDiv = $("<div>").attr("class", "card-text");
    const imgEl = $("<img>").attr("src", iconUrl);
    const cardTitleHeader = $("<h6>").text(date).addClass("pt-2");
    const tempEl = $("<p>").text(`Temp: ${temp} ºF"`).css("font-size", "0.60rem");
    const windSpeedEl = $("<p>").text(`Wind: ${windSpeed} MPH"`).css("font-size", "0.60rem");
    const humidityEl = $("<p>").text(`Humidity: ${humidity} %`).css("font-size", "0.60rem");

    cardTextDiv.append(imgEl);
    cardTextDiv.append(tempEl);
    cardTextDiv.append(windSpeedEl);
    cardTextDiv.append(humidityEl);
    cardTitleDiv.append(cardTitleHeader);
    cardBlockDiv.append(cardTitleDiv);
    cardBlockDiv.append(cardTextDiv);
    cardEl.append(cardBlockDiv);
    $(".card-deck").append(cardEl);
}

function addCardDeckHeader() {
    deckHeader = $("<h4>").text("5-Day Forecast").attr("id", "card-deck-title");
    deckHeader.addClass("pt-4 pt-2");
    $(".card-deck").before(deckHeader);
}

// To clear html of current searched city data to make way for next searched city data
function clearDisplayedWeatherInfo() {
    $("#current-weather-conditions").empty();
    $("#card-deck-title").remove();
    $(".card-deck").empty();
}

function searchCity(cityName) {
    // run the AJAX call to the OpenWeatherAPI
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`,
        method: "GET"
    })

        // store all of the retrieved data inside of an object called "response"
        .then((response) => {
            console.log(response)
            searchedCity = response.name.trim();
            currentDate = moment.unix(response.dt).format("l");
            currentTemp = response.main.temp;
            currentHumidity = response.main.humidity;
            currentWindSpeed = response.wind.speed;
            currentWeatherIconUrl = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;
            displayCurrentWeather(searchedCity, currentDate, currentTemp, currentHumidity, currentWindSpeed, currentWeatherIconUrl)

            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`,
                method: "GET"
            })
                .then((response) => {

                    console.log('this is 5 day', response)
                    const fiveDayForecast = response.list;

                    for (let i = 3; i < fiveDayForecast.length; i+8) {
                        console.log('here')
                        // const currentDay = fiveDayForecast[i]
                        // const date = moment.unix(currentDay.dt).format("l");
                        // const temp = currentDay.main.temp
                        // const windSpeed = currentDay.wind.speed
                        // const humidity = currentDay.main.humidity
                        // const icon = `https://openweathermap.org/img/w/${currentDay.weather[0].icon}.png`

                        // displayFiveDayForecast(date, temp, windSpeed, humidity, icon)
                    }
                    //    addCardDeckHeader()
                    //    for (let i=0; i < 5; i++) {
                    //      iconcode = fiveDayForecast[i].weather[0].icon;
                    //      iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
                    //     //  dateValue = moment().tz(country + "/" + city).add(i, 'days').format('l');
                    //     dateValue = moment.unix(fiveDayForecast[i].dt).format('l');
                    //      minTempK = fiveDayForecast[i].temp.min;
                    //      minTempF =  ((minTempK - 273.15) * 1.80 + 32).toFixed(1);
                    //      maxTempK = fiveDayForecast[i].temp.max;
                    //      maxTempF =  (((fiveDayForecast[i].temp.max) - 273.15) * 1.80 + 32).toFixed(1);
                    //      dayhumidity = fiveDayForecast[i].humidity;
                    //      displayFiveDayForecast()
                    //    } 
                });
        });
    //  });
}