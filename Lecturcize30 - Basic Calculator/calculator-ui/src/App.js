import './App.css';

import { useRef, useState } from 'react';

function App() {
  const x = useRef(null);
  const y = useRef(null);
  const [result, setResult] = useState("");

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
    x.current.value = "";
    y.current.value = "";
    setResult("");
  }

  return (
    <div id="calculator">
      <h3>Simple Calculator</h3>
      <form>
        <label>x: </label><input id='x' type='number' ref={x} /><br /><br />
        <label>y: </label><input id='y' type='number' ref={y} /><br /><br />
        <button className='calculator-btn' onClick={add}>Add</button>
        <button className='calculator-btn' onClick={subtract}>Subtract</button>
        <button className='calculator-btn' onClick={clear}>Clear</button>
      </form>
      <br />
      <span>Result: </span><span>{result}</span>
    </div>
  );
}

export default App;