import { Card } from "react-bootstrap";


function WindSpeed(props: { windSpeed: number }) {
    return (
        <Card className="card-glass-dark" body>
            Wind Speed: <br /> {props.windSpeed} m/s
        </Card>
    );
}

export default WindSpeed;