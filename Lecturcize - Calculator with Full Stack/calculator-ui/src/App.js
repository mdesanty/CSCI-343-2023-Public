import './App.css';

import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const x = useRef(null);
  const y = useRef(null);
  const [result, setResult] = useState('');
  const [xIsInvalid, setXIsInvalid] = useState(false);
  const [yIsInvalid, setYIsInvalid] = useState(false);

  function add(e) {
    e.preventDefault();
    console.log(`Adding ${x.current.value} and ${y.current.value}`);

    axios.get(`/add?x=${x.current.value}&y=${y.current.value}`)
      .then(
        (response) => {
          setXIsInvalid(false);
          setYIsInvalid(false);
          setResult(response.data.result);
        },
        (error) => {
          if (error.response.data.errors.x !== undefined)
            setXIsInvalid(true);

          if (error.response.data.errors.y !== undefined)
            setYIsInvalid(true);

          console.log("Bad stuff: " + error);
        }
      );
  }

  function subtract(e) {
    e.preventDefault();
    console.log(`Subtracting ${x.current.value} and ${y.current.value}`);

    axios.get(`/subtract?x=${x.current.value}&y=${y.current.value}`)
      .then(
        (response) => {
          setXIsInvalid(false);
          setYIsInvalid(false);
          setResult(response.data.result);
        },
        (error) => {
          if (error.response.data.errors.x !== undefined)
            setXIsInvalid(true);

          if (error.response.data.errors.y !== undefined)
            setYIsInvalid(true);

          console.log("Bad stuff: " + error);
        }
      );
  }

  function clear(e) {
    e.preventDefault();
    x.current.value = '';
    y.current.value = '';
    setXIsInvalid(false);
    setYIsInvalid(false);
    setResult('');
  }

  return (
    <div className='container'>
      <div id="calculator" className='ps-3 pe-3 pb-2 mt-3 border rounded'>
        <h3 className='mt-2'>Simple Calculator</h3>
        <Form>
          <Form.Group className='mb-3 calculator-number'>
            <Form.Label>First Number (x)</Form.Label>
            <Form.Control className={xIsInvalid ? 'is-invalid' : '' } type='number' ref={x} placeholder='Enter a number' onChange={ () => setXIsInvalid(false) }></Form.Control>
            <div className="invalid-feedback">
              Must be a number.
            </div>
          </Form.Group>
          <Form.Group className='mb-4 calculator-number'>
            <Form.Label>Second Number (y)</Form.Label>
            <Form.Control className={yIsInvalid ? 'is-invalid' : ''} type='number' ref={y} placeholder='Enter a number' onChange={() => setYIsInvalid(false)}></Form.Control>
            <div className="invalid-feedback">
              Must be a number.
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