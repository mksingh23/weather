let appId = 'd70235d6505444f068b74370fc84971b';
let units = "farenheight";
let searchMethod;
let searchTerm;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm) {
        searchMethod = "zip";
    } else {
        searchMethod = "q";
    }
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then(result => {
            return result.json();
        }).then(result => {
            init(result);
        })
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case "Clear":
            document.body.style.backgroundImage = 'url("Clear.jpg")';
            break;
        case "Clouds":
            document.body.style.backgroundImage = 'url("Cloud.jpg")';
            break;
        case "Rain":
        case "Drizzle":
        case "Mist":
            document.body.style.backgroundImage = 'url("Rain.jpg")';
            break;
        case "Thunderstrom":
            document.body.style.backgroundImage = 'url("Storm.jpg")';
            break;
        case "Snow":
            document.body.style.backgroundImage = 'url("Snow.jpg")';
            break;

        default:
            document.body.style.backgroundImage = 'url("Default.jpg")';
            break;
    }
    let weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
    let tempratureElement = document.getElementById("temprature");
    let humidityElement = document.getElementById("humidity");
    let windSpeedElement = document.getElementById("windSpeed");
    let cityHeader = document.getElementById("cityHeader");
    let weatherIcon = document.getElementById("documentIconImg");

    weatherIcon.src = "http://openweathermap.org/img/w/" + resultFromServer.weather[0].icon + ".png";
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    tempratureElement.innerHTML = Math.floor(resultFromServer.main.temp) + "&#176";
    windSpeedElement.innerHTML = "winds at " + Math.floor(resultFromServer.wind.speed) + "m/s";
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = "humidity levels at " + resultFromServer.main.humidity + "%";
    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById("weatherContainer");
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;
    weatherContainer.style.left = 'calc(50% - ${weatherContainerWidth/2}px)';
    weatherContainer.style.top = 'cal(50% -${weatherContainerHeight/1.3}px)';
    weatherContainer.style.visibility = "Visible";
}
document.getElementById("searchButton").addEventListener("click", function() {
    searchTerm = document.getElementById("searchInput").value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
})