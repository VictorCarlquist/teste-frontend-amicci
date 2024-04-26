import { useState } from "react";

function Humidity(props: { humidity: any; }) {
    const [humidity, setHumidity] = useState<number | null>(props.humidity);
    
    return (
        <div>
        {humidity === null ? 'Loading...' : `Humidity: ${humidity}%`}
        </div>
    );
}

export default Humidity;