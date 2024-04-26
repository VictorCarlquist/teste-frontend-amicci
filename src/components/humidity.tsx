import { Card } from "react-bootstrap";
import { DropletHalf } from "react-bootstrap-icons";

function Humidity(props: { humidity: any; }) {
    
    return (
        <Card className="card-glass-dark" body>
            <DropletHalf></DropletHalf>
            Umidade: <br /> {props.humidity}%

        </Card>
    );
}

export default Humidity;