import React, { useState } from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=84ff045ff659866878158ecff63b7963`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching weather:", error));
  };

  const displayWeather = () => {
    if (!weatherData) return null;
    const { name } = weatherData;

    const { icon, description } = weatherData.weather[0];
    const {
      temp,
      humidity,
      temp_max,
      temp_min,
      feels_like,
      pressure,
      sea_level,
    } = weatherData.main;
    const { speed } = weatherData.wind;
    const { visibility } = weatherData;
    const { sunrise, sunset } = weatherData.sys;

    const convertUnixTimestampToTime = (unixTimestamp) => {
      const date = new Date(unixTimestamp * 1000);
      let hours = date.getHours();
      const minutes = "0" + date.getMinutes();

      // Convert hours to 12-hour notation
      hours = hours % 12 || 12;

      const formattedTime = hours + ":" + minutes.substr(-2);
      return formattedTime;
    };

    // Example sunrise and sunset timestamps

    // Convert timestamps to readable time format
    const sunriseTime = convertUnixTimestampToTime(sunrise);
    const sunsetTime = convertUnixTimestampToTime(sunset);

    return (
      <View className="bg-sky-800" style="flex items-center">
        <View className="flex-row justify-between bg-sky-800">
          <Text className="capitalize font-bold text-2xl mt-8 text-white">
            {description}
          </Text>
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${icon}.png` }}
            style={{ width: 90, height: 90 }}
          />
        </View>
        <View className="flex-row justify-start bg-sky-800">
          <Image
            source={require("./assets/location-pin.png")}
            className="w-5 h-5 mt-1 "
          />
          <Text className="text-white ml-3 pt-0.5 text-base">{name}</Text>
        </View>
        <View className="flex-row justify-between bg-sky-800 mt-4 mb-2 rounder-xl">
          <View className="flex-row justify-start bg-sky-800">
            <Text className="text-white font-bold text-5xl">
              {Math.floor(temp)}
            </Text>
            <Image
              source={require("./assets/thermometer.png")}
              className="w-4 h-4 mt-1 "
            />
          </View>
          <View className="flex-row justify-start bg-sky-800 pt-3">
            <Image
              source={require("./assets/wind.png")}
              className="w-5 h-5 mt-1 "
            />
            <Text className="text-white font-bold text-sm pt-1">
              {speed} km/h
            </Text>
          </View>
          <View className="flex-row justify-start bg-sky-800 pt-3">
            <Image
              source={require("./assets/humidity.png")}
              className="w-5 h-5 mt-1 "
            />
            <Text className="text-white font-bold pt-1"> {humidity}%</Text>
          </View>
          <View className="flex-row justify-start bg-sky-800 pt-3">
            <Image
              source={require("./assets/fog.png")}
              className="w-5 h-5 mt-1 "
            />
            <Text className="text-white font-bold pt-1">
              {visibility / 1000} km
            </Text>
          </View>
        </View>
        <View className="mt-4">
          <View className="flex-row justify-between border-2 border-white rounded-xl p-2 pt-4 pb-4 mb-1">
            <Text className="text-white">
              Feels Like:{Math.floor(feels_like)}°C
            </Text>
          </View>

          <View className="flex-row justify-between border-2 border-white rounded-xl p-2 pt-4 pb-4 mb-1">
            <Text className="text-white">
              High Temp: {Math.floor(temp_max)}°C
            </Text>
            <Text className="text-white">
              Low Temp: {Math.floor(temp_min)}°C
            </Text>
          </View>
          <View className="flex-row justify-between border-2 border-white rounded-xl p-2  pt-4 pb-4 mt-1">
            <View className="flex-row justify-start">
              <Text className="text-white pt-1">Sunrise: {sunriseTime}am</Text>
              <Image
                source={require("./assets/sunrise.png")}
                className="w-5 h-5 ml-1"
              />
            </View>
            <View className="flex-row justify-start">
              <Text className="text-white pt-1">Sunset: {sunsetTime}pm</Text>
              <Image
                source={require("./assets/sunset.png")}
                className="w-5 h-5 ml-1"
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="bg-sky-800 min-h-screen flex flex-col justify-center items-center p-5">
      <View className="flex-column justify-between bg-sky-800 w-full pt-4 pb-4 pr-4 pl-1 mb-5">
        <View className="items-center">
          <Text className="text-white font-bold text-2xl mb-10">
            WEATHER CHECK
          </Text>
        </View>
        <View className="flex-row justify-between">
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="Enter city"
            className="bg-white p-3 rounded mb-4 w-11/12 mr-3"
          />
          <TouchableOpacity onPress={fetchWeather}>
            <Image
              source={require("./assets/search-icon.png")}
              className="w-8 h-8 mt-1 "
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-sky-800 p-5 w-full rounded-lg">
        {displayWeather()}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
