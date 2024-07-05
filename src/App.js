import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useState} from 'react';
import Screen from './components/Screen';
import History from './components/History';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [history, setHistory] = useState([]);

  const addHistory = (value) => {
    setHistory([...history, value])
  }

  return (
    <Container className='app-container'>
      <Row>
      <Col className='app-row' sm={8}><Screen addHistory={addHistory}/></Col>
      <Col className='app-row' sm={4}><History history = {history} /></Col> 
      </Row>
    </Container>
  );
}

export default App;
