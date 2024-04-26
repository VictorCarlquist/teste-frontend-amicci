import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import Temperature from "./temperature";
import WeatherDetail from "./weatherDetail";
import Humidity from "./humidity";
import WindSpeed from "./windSpeed";
import StatusWeather from "./statusWeather";

function Weather() {
  const [inputData, setInputData] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [address, setAddress] = useState("");
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number}>();

   const getWeather = (lat: number, lng:number) => {
      fetch(
         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
           import.meta.env.VITE_WEATHER_API_KEY
         }&lang=pt_br`
       )
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setAddress(data.name);
            setWeatherData(data);
         });
   }

   const addrToGeo = (search: string) => {
      fetch(
         `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${
            import.meta.env.VITE_MAPS_API_KEY}`
      )
      .then((res) => res.json())
      .then((data) => {
         if (!data.results[0] || !("geometry" in data.results[0])) {
            setWeatherData({results: []});
            return;
         }

         let geometry = data.results[0].geometry.location;
         let lat = geometry.lat;
         let lng = geometry.lng;
         setAddress(data.results[0].formatted_address);
         getWeather(lat, lng);
      });
  }

   useEffect(() => {
      if (search === "" && !userLocation) {
         getUserLocation();
         return;
      }

      if (search) {
         addrToGeo(search);
      } else {
         getWeather(userLocation!.latitude, userLocation!.longitude);
      }

  }, [search, userLocation]);

  const [weatherData, setWeatherData] = useState<any>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWeatherData({});
    setSearch(inputData);
  };

  const getUserLocation = () => {
    if (navigator.geolocation && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Erro:", error);
        }
      );
    }
    else {
      console.error("Geolocation nça.");
    }
  };

  return (
    <>
      <Row>
        <Col>
          <div className="large-space">
            <h1>{address}</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Informe a cidade"
                aria-label="Informe a cidade"
                aria-describedby="basic-addon2"
                value={inputData}
                onChange={handleChange}
              />
              <Button variant="outline-primary" type="submit">
                Buscar
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        {(!weatherData || !("weather" in weatherData)) ? (
         <>
          <StatusWeather data={weatherData}></StatusWeather>
          </>
        ) : (
          <>
            <Row>
              <Col>
                <WeatherDetail
                  weatherDetail={weatherData.weather[0].description}
                ></WeatherDetail>
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
