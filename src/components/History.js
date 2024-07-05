import React from 'react'
import { Container, Row } from 'react-bootstrap'

function History({history}) {
  return (
    <Container fluid className="history-container">
        <Row className='history-title'>
            <h1 className='title'>HISTORY</h1>
        </Row>
        <Row className='history-content'>
            <ul className='content'>
              {history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
        </Row>
    </Container>
  )
}

export default History
