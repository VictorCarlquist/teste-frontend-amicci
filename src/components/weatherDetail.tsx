import { Card } from "react-bootstrap";

function WeatherDetail(props: { weatherDetail: any; }) {

  return (
    <Card className="card-glass-dark" body>
      {props.weatherDetail}
    </Card>
  );
}

export default WeatherDetail;