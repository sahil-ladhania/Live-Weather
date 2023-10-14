// Defining All Variables
const defaultCity = "Ghaziabad";
const weatherScreen = document.querySelector("#weather-screen");
const searchButton = document.querySelector('#search-button');
const searchBar = document.querySelector('#search-bar');
const temperatureImage = document.querySelector('#temperature-image');
const temperature = document.querySelector('#temperature');
const cityName = document.querySelector('#city');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
// Defining Function For Checking Weather
const FetchWeather = (city) => {
    const targetCity = city ? city : defaultCity;
    const API_KEY = "9deb81978043e2b77decb4034f07e739";
    const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&units=metric&appid=` + API_KEY;
        fetch(API_ENDPOINT)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                else{
                    throw new Error('Failed To Fetch Weather For Your City !!!');
                };
            })
            .then(data => {
                // Changing Weather Icons Dynamically
                if(data.weather[0].main === "Clouds"){
                    temperatureImage.src = "./images/clouds.png";
                    weatherScreen.style.background = "linear-gradient(to bottom right, #cccccc, #777777)";
                }
                else if(data.weather[0].main === "Clear"){
                    temperatureImage.src = "./images/clear.png";
                    weatherScreen.style.background = "linear-gradient(to bottom right, #22c1c3, #fdbb2d)";
                }
                else if(data.weather[0].main === "Rain"){
                    temperatureImage.src = "./images/rain.png";
                    weatherScreen.style.background = "linear-gradient(to bottom right, #9dc2f4, #8e9eab)";
                }
                else if(data.weather[0].main === "Drizzle"){
                    temperatureImage.src = "./images/drizzle.png";
                    weatherScreen.style.background = "linear-gradient(to bottom right, #a5d2f3, #898c90)";
                }
                else if(data.weather[0].main === "Mist"){
                    temperatureImage.src = "./images/mist.png";
                    weatherScreen.style.background = "linear-gradient(to bottom right, #98b4d4, #1c2737)";
                }
                else if(data.weather[0].main === "Snow"){
                    temperatureImage.src = "./images/snow.png";
                    weatherScreen.style.background = "linear-gradient(to bottom right, #b8c2e9, #6c87aa)";
                }
                // Setting Values In HTML Elements
                temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
                cityName.innerHTML = data.name;
                humidity.innerHTML = `${data.main.humidity}%`;
                windSpeed.innerHTML = `${Math.round(data.wind.speed)} km/h`;
            })
            .catch(error => {
                console.log("Error : " , error);
            });
};
// Defining Event Handler For Searching City
searchButton.addEventListener('click' , () => {
    // Calling FetchWeather Function
    FetchWeather(searchBar.value);
})
// Loading Default City Weather
document.addEventListener('DOMContentLoaded', () => {
    // Calling FetchWeather Function
    FetchWeather();
});