import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AuthorForm({ author, ...props }) {
  const [alert, setAlert] = useState({message: '', type: ''});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', first_name: '', middle_name: '', last_name: '', ...author });

  function handleSubmit(e) {
    setIsSubmitting(true);

    e.preventDefault();
    let request;
    let messageAction;

    if (author?.id !== undefined) {
      request = axios.put('/authors/' + author.id, formData);
      messageAction = 'update';
    }
    else {
      request = axios.post('/authors/', formData)
      messageAction = 'create';
    }

    request
      .then(results => {
        setAlert({message: `Author successfully ${messageAction}d.`, type: 'success'});
      })
      .catch(error => {
        console.log(error);
        setAlert({message: `Failed to ${messageAction} author.`, type: 'danger'});
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <>
      {alert.message ? <Alert className='text-center' variant={alert.type} onClose={() => setAlert({message: '', type: ''})} dismissible>{alert.message}</Alert> : null}

      <Form id='author-form' className='mt-3 w-50'>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' value={formData.title} placeholder='Enter title' onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control type='text' value={formData.first_name} placeholder='Enter first name' onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Middle name</Form.Label>
          <Form.Control type='text' value={formData.middle_name} placeholder='Enter middle name' onChange={(e) => setFormData({ ...formData,  middle_name: e.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control type='text' value={formData.last_name} placeholder='Enter last name' onChange={(e) => setFormData({ ...formData,  last_name: e.target.value })} />
        </Form.Group>
        <Form.Group className='mt-4'>
          <Button className='btn-primary me-2' onClick={!isSubmitting ? handleSubmit : null}>Save</Button>
          <Button as={Link} to='/authors' className='btn-secondary'>Cancel</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default AuthorForm;