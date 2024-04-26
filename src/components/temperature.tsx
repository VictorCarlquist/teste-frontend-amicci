import { Card } from "react-bootstrap";
import { ThermometerHalf } from "react-bootstrap-icons";

function Temperature(props: { temperature: any; }) {

  return (
    <Card body className="card-glass-dark">
        <ThermometerHalf></ThermometerHalf>
      Temperatura: <br />{(props.temperature - 273.15).toFixed(2) }°C
    </Card>
  );
}

export default Temperature;