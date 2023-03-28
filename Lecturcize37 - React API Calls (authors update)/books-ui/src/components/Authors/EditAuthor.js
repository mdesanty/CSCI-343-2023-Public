import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Form, Button, Alert } from 'react-bootstrap';
import Loading from '../Loading';

function EditAuthor() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({message: '', type: ''});
  const [formData, setFormData] = useState({title: '', first_name: '', middle_name: '', last_name: ''});

  useEffect(() => {
    fetchAuthor();
  }, []);

  function fetchAuthor() {
    axios.get('/authors/' + params.id)
      .then(results => {
        setFormData({
          title: results.data.title || '',
          first_name: results.data.first_name || '',
          middle_name: results.data.middle_name || '',
          last_name: results.data.last_name || ''
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSubmit(e) {
    setIsSubmitting(true);

    e.preventDefault();
    axios.put('/authors/' + params.id, formData)
      .then(results => {
        setAlert({message: 'Author successfully updated.', type: 'success'});
      })
      .catch(error => {
        console.log(error);
        setAlert({message: 'Failed to update author.', type: 'danger'});
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <>
      {alert.message ? <Alert className='text-center' variant={alert.type} onClose={() => setAlert({message: '', type: ''})} dismissible>{alert.message}</Alert> : null}

      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/authors' }}>
          Authors
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          This author
        </Breadcrumb.Item>
      </Breadcrumb>

      {isLoading ?
          <Loading />
        :
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
      }
    </>
  );
}

export default EditAuthor;