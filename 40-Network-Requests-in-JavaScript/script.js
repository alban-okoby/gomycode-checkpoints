const apiKey = '3d9f07bebc994d99d2cc00c6e2098f35'; // API_KEY_HERE Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const loading = document.getElementById('loading');

// DOM elements for weather data
const cityName = document.getElementById('city-name');
const country = document.getElementById('country');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feels-like');
const weatherDesc = document.getElementById('weather-desc');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherIcon = document.getElementById('weather-icon');

// Event listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Initial weather fetch for default city (London)
window.addEventListener('load', () => {
    getWeather();
});

async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    // Show loading, hide previous results and errors
    showLoading();
    hideWeatherInfo();
    hideError();
    
    try {
        const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        
        if (response.ok) {
            displayWeather(data);
        } else {
            handleError(data);
        }
    } catch (error) {
        showError('Failed to fetch weather data. Please try again.');
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    country.textContent = data.sys.country;
    temp.textContent = Math.round(data.main.temp);
    feelsLike.textContent = Math.round(data.main.feels_like);
    weatherDesc.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = (data.wind.speed * 3.6).toFixed(1); // Convert m/s to km/h
    
    // Set weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    showWeatherInfo();
}

function handleError(data) {
    if (data.cod === '404') {
        showError('City not found. Please check the city name.');
    } else if (data.cod === '401') {
        showError('Invalid API key. Please check your API key.');
    } else {
        showError(data.message || 'An error occurred. Please try again.');
    }
}

function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showWeatherInfo() {
    weatherInfo.classList.remove('hidden');
}

function hideWeatherInfo() {
    weatherInfo.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}