import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function SignUp() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  function handleSubmit() {
    axios.post('/auth/login', formData)
      .then(result => {
        localStorage.setItem('user', JSON.stringify(result.data));
        navigate('/songs');
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Form id='signup-form' className='w-50' >
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placeholder='Enter email' onChange={e => setFormData({ ...formData, email: e.target.value })} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Enter password' onChange={e => setFormData({ ...formData, password: e.target.value })} />
      </Form.Group>
      <Form.Group>
        <Button className='mt-4 btn-primary' onClick={handleSubmit} >
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

export default SignUp;