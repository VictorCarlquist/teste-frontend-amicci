import { Card } from "react-bootstrap";

function Temperature(props: { temperature: any; }) {

  return (
    <Card body className="card-glass-dark">
      Temperatura: <br />{(props.temperature - 273.15).toFixed(2) }°C
    </Card>
  );
}

export default Temperature;