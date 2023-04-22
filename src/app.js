'use strict';
import { Weather } from "./weather";
import { UI } from "./ui";
// init weather class
const weather = new Weather();
const ui = new UI();

// get weather on DOM Load
document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem('city')) {
        // get current location
        weather.getLocation()
            .then(res => {
                // store in local storage
                localStorage.setItem('city', `${res.city}`);
                getTheWeather();
            })
            .catch(err => console.log(err));
    }

    if (localStorage.getItem('city')) {
        getTheWeather();
    }
});

// change location event
document.getElementById('change-city').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;

    if (city.trim() === '') {
        document.getElementById('w-form').reset();
        return;
    }

    weather.changeCity(city);
    getTheWeather();
    // clear form
    document.getElementById('w-form').reset();
});

// get the weather using LS
function getTheWeather() {

    weather.getWeather(localStorage.getItem('city'))
        .then(result => {
            ui.render(result);
        })
        .catch(err => console.log(err));
}


