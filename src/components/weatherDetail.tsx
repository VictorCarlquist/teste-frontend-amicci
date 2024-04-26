import { useState } from "react";

function WeatherDetail(props: { weatherDetail: any; }) {
  const [weatherDetail, setWeatherDetail] = useState<number | null>(props.weatherDetail);

  return (
    <div>
      {weatherDetail === null ? 'Loading...' : `weatherDetail: ${weatherDetail}°C`}
    </div>
  );
}

export default WeatherDetail;