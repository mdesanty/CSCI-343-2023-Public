import { Button } from 'react-bootstrap';

function CalculatorButton(props) {
  return (
    <Button className='me-2' onClick={props.clickHandler}>{props.buttonText}</Button>
  );
}

export default CalculatorButton;