import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import Temperature from "./temperature";
import WeatherDetail from "./weatherDetail";
import Humidity from "./humidity";
import WindSpeed from "./windSpeed";

function Weather() {
  const [inputData, setInputData] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [address, setAddress] = useState("")

  useEffect(() => {
      if (search === "") {
         return;
      }

      fetch(
         `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${import.meta.env.VITE_MAPS_API_KEY}`
      )
         .then((res) => res.json())
         .then((data) => {
            console.log(data);

            let geometry = data.results[0].geometry.location;
            let lat = geometry.lat;
            let lng = geometry.lng;
            setAddress(data.results[0].formatted_address);
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
      setWeatherData(null);
      setSearch(inputData);
   }

   return (
      <>
      <Row>
          <Col>
            <div className='large-space'>
               <h1>{address}</h1>
            </div>
          </Col>
        </Row>
      <Row>
         <Col>
            <Form onSubmit={handleSubmit}>
               <InputGroup className="mb-3">
                  <Form.Control
                     placeholder="Recipient's username"
                     aria-label="Recipient's username"
                     aria-describedby="basic-addon2"
                     value={inputData} onChange={handleChange}
                  />
                  <Button variant="outline-primary" type="submit">
                     Buscar
                  </Button>
               </InputGroup>
            </Form>
         </Col>
      </Row>
      <Row>
         {weatherData === null ? (
            <Spinner animation="border" variant="info" />
         )
            : (
               <>
                  <Row>

               <Col>
                  <WeatherDetail weatherDetail={weatherData.weather[0].description} ></WeatherDetail>
               </Col>
               </Row>
               <Row>
               <Col>
                  <Temperature temperature={weatherData.main.temp}></Temperature>
               </Col>
               <Col>
                  <Humidity humidity={weatherData.main.humidity}></Humidity>
               </Col>
               <Col>
                  <WindSpeed windSpeed={weatherData.wind.speed}></WindSpeed>
               </Col>
                  </Row>
               </>
            )}
      </Row>
      </>
   );
}

export default Weather;
