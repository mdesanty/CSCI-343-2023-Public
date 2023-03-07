import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';

import CalculatorButton from './CalculatorButton';

function CalculatorForm(props) {
  const x = useRef(null);
  const y = useRef(null);
  const [result, setResult] = useState('');

  function add(e) {
    e.preventDefault();
    console.log(`Adding ${x.current.value} and ${y.current.value}`);

    const xValue = parseFloat(x.current.value);
    const yValue = parseFloat(y.current.value);

    setResult(xValue + yValue);
  }

  function subtract(e) {
    e.preventDefault();
    console.log(`Adding ${x.current.value} and ${y.current.value}`);

    const xValue = parseFloat(x.current.value);
    const yValue = parseFloat(y.current.value);

    setResult(xValue - yValue);
  }

  function clear(e) {
    e.preventDefault();
    x.current.value = '';
    y.current.value = '';
    setResult('');
  }

  return (
    <div id="calculator" className='ps-3 pe-3 pb-2 mt-3 border rounded'>
      <h3 className='mt-2'>Simple Calculator</h3>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>First Number (x)</Form.Label>
          <Form.Control className='calculator-number' type='number' ref={x} placeholder='Enter a number'></Form.Control>
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>Second Number (y)</Form.Label>
          <Form.Control className='calculator-number' type='number' ref={y} placeholder='Enter a number'></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3'>
          <CalculatorButton clickHandler={add} buttonText='Add'></CalculatorButton>
          <CalculatorButton clickHandler={subtract} buttonText='Subtract'></CalculatorButton>
          <CalculatorButton clickHandler={clear} buttonText='Clear'></CalculatorButton>
        </Form.Group>
      </Form>
      <span>Result: </span><span>{result}</span>
    </div>
  );
}

export default CalculatorForm;