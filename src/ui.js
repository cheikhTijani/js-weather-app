export class UI {
    constructor() {
        // data elements 
        this.location = document.getElementById('location');
        this.desc = document.getElementById('desc');
        this.temp = document.getElementById('temp');
        this.icon = document.getElementById('icon');
        this.humidity = document.getElementById('humidity');
        this.feelsLike = document.getElementById('feels-like');
        this.visibility = document.getElementById('visibility');
        this.wind = document.getElementById('wind');
        this.sunrise = document.getElementById('sunrise');
        this.sunset = document.getElementById('sunset');
        // loaders
        this.loading = document.getElementById('loading');
        this.title = document.getElementById('title');
        this.details = document.getElementById('details');


    }

    render(data) {
        // set data
        this.location.textContent = `${localStorage.getItem('city')}, ${data.sys.country}`;
        this.desc.textContent = data.weather[0].description;
        this.temp.textContent = `${data.main.temp.toFixed()}° C`;
        this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        this.humidity.textContent = `Humidity: ${data.main.humidity}%`;
        this.feelsLike.textContent = `Feels Like: ${data.main.feels_like.toFixed()}° C`;
        this.visibility.textContent = `Visibility: ${data.visibility / 1000}Km`;
        this.wind.textContent = `Wind: ${data.wind.speed.toFixed()} km/h`;
        this.sunrise.textContent = `Sunrise: ${this.stampToTime(data.sys.sunrise, data.timezone)} am`;
        this.sunset.textContent = `Sunset: ${this.stampToTime(data.sys.sunset, data.timezone)} pm`;

        // show data
        this.title.classList.add('d-none');
        this.loading.classList.add('d-none');
        this.details.classList.remove('d-none');
    }

    stampToTime(stamp, tz) {
        const date = new Date((stamp + tz) * 1000);
        const time = `${date.getHours()}:${date.getMinutes()}`;
        return time;
    }
}