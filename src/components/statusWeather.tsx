import { Spinner } from "react-bootstrap";


function StatusWeather(props: { data: any }) {
    if (!props.data)
        return <div></div>;

    if ("results" in props.data)
        return <div>Cidade não encontrada</div>;

    return <Spinner animation="border" variant="info" />;
}

export default StatusWeather;