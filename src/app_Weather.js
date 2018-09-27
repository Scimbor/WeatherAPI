import {
    http
} from './http';
import {
    ui
} from './ui';

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const API_KEY = '11555b105c0aeb052b12cf451e30cdea';

//Get INFO about weather and display
searchButton.addEventListener('click', getWeather);

//Loaded weather
document.addEventListener('DOMContentLoaded', loadWeather);

function getWeather(e) {
    var cityName = searchInput.value;

    http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`)
        .then(data => {
            ui.showWeather(data);
        })
        .catch(err => console.log(err));

    http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${API_KEY}`)
        .then(data => {
            ui.showChart(data);
        })
        .catch(err => console.log(err));



    e.preventDefault();
}

function loadWeather(e) {
    navigator.geolocation.getCurrentPosition(function (location) {
        http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&APPID=${API_KEY}`)
            .then(data => {
                ui.showWeather(data);
            })
            .catch(err => console.log(err));

        http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&APPID=${API_KEY}`)
            .then(data => {
                ui.showForecast(data);
                ui.showChart(data);
            })
            .catch(err => console.log(err));
    });

    e.preventDefault();
}