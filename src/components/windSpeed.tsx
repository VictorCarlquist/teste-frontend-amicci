import { Card } from "react-bootstrap";
import { Wind } from "react-bootstrap-icons";


function WindSpeed(props: { windSpeed: number }) {
    return (
        <Card className="card-glass-dark" body>
            <Wind></Wind>
            Vento: <br /> {props.windSpeed} m/s
        </Card>
    );
}

export default WindSpeed;