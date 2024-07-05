import React, { useState } from 'react';
import { Container, Row, Table, Button } from 'react-bootstrap';

function Screen({ addHistory }) {
  const [result, setResult] = useState('');
  const [currentNumber, setCurrentNumber] = useState('');

  const handleButtonClik = (value) => {
    if(result !== ''){
      if(!isNaN(value)){//数字
          clearResult();
          setCurrentNumber(value);   
      }else{
        if(value === '%' || value === '±' || value === 'x²' || value === 'π' || value === '√x' || value === '1/x' || value === '10^x'){
          const newResult = operations[value](result);
          setResult(newResult);
        }else if(value === 'C'){
          clearResult();
        }else if(value === '='){
          clearResult();
        }else if(value === 'AC'){
          clearResult();
        }else{
        setCurrentNumber(result + value);
        setResult('');
      }}
    }else{
      inputExpression(value);
    }
  }

  const calculateResult = (value) => {
    try{
      const correctedValue = value.replace(/÷/g, '/').replace(/×/g, '*').replace(/--/g, '+');
      return eval(correctedValue);
    }catch (error){
      return 'Error';
    }
  }

  const clearResult = () => {
    setCurrentNumber('');
    setResult('');
  }

  const inputExpression = (value) => {
    if (value === '='){
      const result = calculateResult(currentNumber);
      setResult(result);
      if(result !== 'Error'){
        addHistory(`${currentNumber} = ${result}`);
        setCurrentNumber('');
      } 
    }else if(value === 'AC'){
      clearResult();
    }else if(value === 'C'){
      setCurrentNumber(currentNumber.slice(0, -1));
    }else if(value in operations){
      if(isNaN(currentNumber.slice(-1))){setResult('Error');
      }else{
        const index = findLastIndex(currentNumber);
        if(index !== 'no'){
          const newLastNumber = operations[value](currentNumber.slice(index + 1));
          setCurrentNumber(currentNumber.slice(0, index + 1) + newLastNumber);
        }else{
          const newLastNumber = operations[value](currentNumber);
          setCurrentNumber(newLastNumber.toString());
        }
        
      }
     
    }else{
      setCurrentNumber(currentNumber + value);
    }
  }

  const operations = {
    '%': (value) => value / 100,
    '√x': (value) => Math.sqrt(value),
    'x²': (value) => value ** 2,
    '±': (value) => -value,
    'π': () => Math.PI,
    '1/x': (value) => 1/value,
    '10^x': (value) => 10 ** value
  };

  const findLastIndex = (str) => {
    for (let i = str.length - 1; i >= 0; i--) {
      if (isNaN(parseInt(str[i], 10)) && str[i]!== '.') {
        return i;
      }
    }
    return 'no';
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <Container fluid className="table-container">
      <Row className='screen'>
        <h1 className='screen-number'>{formatNumber(currentNumber)}</h1>
        <h1 className='screen-number screen-result'>{formatNumber(result)}</h1>
      </Row>
      <Row>
        <Table variant="dark">
          <tbody>
            <tr>
              <td><Button variant="danger" className='cal-button' onClick={() => handleButtonClik('AC')}>AC</Button></td>
              <td><Button variant="danger" className='cal-button' onClick={() => handleButtonClik('C')}>C</Button></td>
              <td><Button variant="light" className='cal-button' onClick={() => handleButtonClik('%')}>%</Button></td>
              <td><Button variant="warning" className='cal-button' onClick={() => handleButtonClik('÷')}>÷</Button></td>
              <td><Button variant="secondary" className='cal-button' onClick={() => handleButtonClik('π')}>π</Button></td>
            </tr>
            <tr>
              <td><Button variant="info" className='cal-button' onClick={() => handleButtonClik('7')}>7</Button></td>
              <td><Button variant="info" className='cal-button' onClick={() => handleButtonClik('8')}>8</Button></td>
              <td><Button variant="info" className='cal-button' onClick={() => handleButtonClik('9')}>9</Button></td>
              <td><Button variant="warning" className='cal-button' onClick={() => handleButtonClik('*')}>x</Button></td>
              <td><Button variant="light" className='cal-button' onClick={() => handleButtonClik('x²')}>x²</Button></td>
            </tr>
            <tr>
              <td><Button variant="info" className='cal-button' onClick={() => handleButtonClik('4')}>4</Button></td>
              <td><Button variant="info" className='cal-button' onClick={() => handleButtonClik('5')}>5</Button></td>
              <td><Button variant="info" className='cal-button' onClick={() => handleButtonClik('6')}>6</Button></td>
              <td><Button variant="warning" className='cal-button' onClick={() => handleButtonClik('+')}>+</Button></td>
              <td><Button variant="light" className='cal-button' onClick={() => handleButtonClik('√x')}>√x</Button></td>
            </tr>
            <tr>
              <td><Button variant="info" className='cal-button' onClick={() => handleButtonClik('1')}>1</Button></td>
              <td><Button variant="info" className='cal-button' onClick={() => handleButtonClik('2')}>2</Button></td>
              <td><Button variant="info" className='cal-button' onClick={() => handleButtonClik('3')}>3</Button></td>
              <td><Button variant="warning" className='cal-button' onClick={() => handleButtonClik('-')}>-</Button></td>
              <td><Button variant="light" className='cal-button' onClick={() => handleButtonClik('1/x')}>1/x</Button></td>
            </tr>
            <tr>
              <td><Button variant="info" className='cal-button' onClick={() => handleButtonClik('0')}>0</Button></td>
              <td><Button variant="info" className='cal-button' onClick={() => handleButtonClik('.')}>.</Button></td>
              <td><Button variant="light" className='cal-button' onClick={() => handleButtonClik('±')}>±</Button></td>
              <td><Button variant="success" className='cal-button' onClick={() => handleButtonClik('=')}>=</Button></td>
              <td><Button variant="secondary" className='cal-button' onClick={() => handleButtonClik('10^x')}>10^x</Button></td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default Screen;
