import './App.css';

import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const x = useRef(null);
  const y = useRef(null);
  const [result, setResult] = useState('');
  const [errors, setErrors] = useState({});

  function add(e) {
    e.preventDefault();
    console.log(`Adding ${x.current.value} and ${y.current.value}`);

    axios.get(`/add?x=${x.current.value}&y=${y.current.value}`)
      .then(
        (response) => {
          setErrors({});
          setResult(response.data.result);
        },
        (error) => {
          setErrors(error.response.data.errors);
        }
      );
  }

  function subtract(e) {
    e.preventDefault();
    console.log(`Subtracting ${x.current.value} and ${y.current.value}`);

    axios.get(`/subtract?x=${x.current.value}&y=${y.current.value}`)
      .then(
        (response) => {
          setErrors({});
          setResult(response.data.result);
        },
        (error) => {
          setErrors(error.response.data.errors);
        }
      );
  }

  function clear(e) {
    e.preventDefault();
    setErrors({});
    x.current.value = '';
    y.current.value = '';
    setResult('');
  }

  return (
    <div className='container'>
      <div id="calculator" className='ps-3 pe-3 pb-2 mt-3 border rounded'>
        <h3 className='mt-2'>Simple Calculator</h3>
        <Form>
          <Form.Group className='mb-3 calculator-number'>
            <Form.Label>First Number (x)</Form.Label>
            <Form.Control className={errors.x !== undefined ? 'is-invalid' : '' } type='number' ref={x} placeholder='Enter a number' onChange={ () => setErrors({ ...errors, x: undefined}) }></Form.Control>
            <div className="invalid-feedback">
              {errors.x}
            </div>
          </Form.Group>
          <Form.Group className='mb-4 calculator-number'>
            <Form.Label>Second Number (y)</Form.Label>
            <Form.Control className={errors.y !== undefined ? 'is-invalid' : ''} type='number' ref={y} placeholder='Enter a number' onChange={() => setErrors({ ...errors, y: undefined})}></Form.Control>
            <div className="invalid-feedback">
              {errors.y}
            </div>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Button className='me-2' onClick={add}>Add</Button>
            <Button className='me-2' onClick={subtract}>Subtract</Button>
            <Button className='me-2' onClick={clear}>Clear</Button>
          </Form.Group>
        </Form>
        <span>Result: </span><span>{result}</span>
      </div>
    </div>
  );
}

export default App;