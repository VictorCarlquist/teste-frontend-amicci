import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import Weather from './components/weather'

function App() {

  return (
    <>
      <Container>
        <Row>
          <Col>
          <Weather />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
