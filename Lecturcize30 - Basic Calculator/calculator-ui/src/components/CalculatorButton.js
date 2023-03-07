function CalculatorButton(props) {
  return (
    <button className='calculator-btn' onClick={props.clickHandler}>{props.buttonText}</button>
  );
}

export default CalculatorButton;