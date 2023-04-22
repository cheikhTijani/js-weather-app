import * as dotenv from 'dotenv';
dotenv.config();

export class Weather {
    constructor() {
        this.apiKey1 = process.env.API_KEY_1;
        this.apiKey2 = process.env.API_KEY_2;
    }

    async getLocation() {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${this.apiKey1}&fields=city`);

        const data = await response.json();

        return data;
    }

    async getWeather(city) {
        // forward geocoding to get lat and lon
        const responseCoords = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.apiKey2}`);

        const dataCoords = await responseCoords.json();
        const lat = dataCoords[0].lat;
        const lon = dataCoords[0].lon;

        // get Weather
        const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey2}`);

        const dataWeather = await responseWeather.json();

        return dataWeather;
    }

    // change city
    changeCity(city) {
        localStorage.setItem('city', city);
    }
}
