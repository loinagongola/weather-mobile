import axios from 'axios';

const API_KEY = '18c8e8974534fc20f7150b3a9680d8bb'; // Replace 'YOUR_API_KEY' with your actual API key

const forecastEndpoint = 'https://api.openweathermap.org/data/2.5/onecall';
const locationsEndpoint = 'https://api.openweathermap.org/data/2.5/find';

const apiCall = async (endpoint, params) => {
    try {
        const response = await axios.get(endpoint, {
            params: {
                ...params,
                appid: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export const fetchWeatherForecast = async (params) => {
    return await apiCall(forecastEndpoint, params);
}

export const fetchLocations = async (params) => {
    return await apiCall(locationsEndpoint, params);
}
