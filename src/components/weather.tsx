import { useEffect, useState } from "react";

function Weather() {
  const [inputData, setInputData] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
      if (search === "") {
         return;
      }
      console.log(`${import.meta.env.VITE_MAPS_API_KEY}`);

      fetch(
         `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${import.meta.env.VITE_MAPS_API_KEY}`
      )
         .then((res) => res.json())
         .then((data) => {
            let geometry = data.results[0].geometry.location;
            let lat = geometry.lat;
            let lng = geometry.lng;
            fetch(
               `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
            ).then((res) => res.json()).then((data) => {
               console.log(data);
               setWeatherData(data);
            });
   });
   }, [search]);

  const data =                           
  {
    "coord": {
      "lon": 10.99,
      "lat": 44.34
    },
    "weather": [
      {
        "id": 501,
        "main": "Rain",
        "description": "moderate rain",
        "icon": "10d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 298.48,
      "feels_like": 298.74,
      "temp_min": 297.56,
      "temp_max": 300.05,
      "pressure": 1015,
      "humidity": 64,
      "sea_level": 1015,
      "grnd_level": 933
    },
    "visibility": 10000,
    "wind": {
      "speed": 0.62,
      "deg": 349,
      "gust": 1.18
    },
    "rain": {
      "1h": 3.16
    },
    "clouds": {
      "all": 100
    },
    "dt": 1661870592,
    "sys": {
      "type": 2,
      "id": 2075663,
      "country": "IT",
      "sunrise": 1661834187,
      "sunset": 1661882248
    },
    "timezone": 7200,
    "id": 3163858,
    "name": "Zocca",
    "cod": 200
  };

  const [weatherData, setWeatherData] = useState<any>(data);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSearch(inputData);
   }

   return (
      <>
      <form onSubmit={handleSubmit}>
      <input type="text" value={inputData} onChange={handleChange} />
      <button type="submit">Search</button>
      </form>
         {weatherData === null ? (
            <div>Loading...</div>
         )
            : (
               <div>
                  <div>Temperature: {weatherData.main.temp}°C</div>
                  <div>Weather: {weatherData.weather[0].description}</div>
                  <div>Humidity: {weatherData.main.humidity}%</div>
               </div>
            )}
      </>
   );
}

export default Weather;
