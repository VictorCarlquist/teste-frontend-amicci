import { Card } from "react-bootstrap";
import { Stars } from "react-bootstrap-icons";

function WeatherDetail(props: { weatherDetail: any; }) {

  return (
    <Card className="card-glass-dark" body>
        <Stars></Stars>
      {props.weatherDetail}
    </Card>
  );
}

export default WeatherDetail;