import { Card } from "react-bootstrap";

function Humidity(props: { humidity: any; }) {
    
    return (
        <Card className="card-glass-dark" body>
            Umidade: <br /> {props.humidity}%
        </Card>
    );
}

export default Humidity;