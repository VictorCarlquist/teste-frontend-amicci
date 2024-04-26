import { useState } from "react";

function Temperature(props: { temperature: any; }) {
  const [temperature, setTemperature] = useState<number | null>(props.temperature);

  return (
    <div>
      {temperature === null ? 'Loading...' : `Temperature: ${temperature}°C`}
    </div>
  );
}

export default Temperature;