import { Card } from "react-bootstrap";
import { Stars } from "react-bootstrap-icons";

function WeatherDetail(props: { weatherDetail: any; }) {

  return (
    <Card className="card-glass-dark card-glass-desc" body>
        <Stars></Stars>
      {props.weatherDetail}
    </Card>
  );
}

export default WeatherDetail;