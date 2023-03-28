import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Form, Button } from 'react-bootstrap';
import Loading from '../Loading';

function EditAuthor() {
  const params = useParams();
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAuthor();
  }, []);

  function fetchAuthor() {
    axios.get('/authors/' + params.id)
      .then(results => {
        setAuthor(results.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
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
              <Form.Control type='text' value={author.title} placeholder='Enter title' />
            </Form.Group>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control type='text' value={author.first_name} placeholder='Enter first name' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Middle name</Form.Label>
              <Form.Control type='text' value={author.middle_name} placeholder='Enter middle name' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control type='text' value={author.last_name} placeholder='Enter last name' />
            </Form.Group>
            <Button as={Link} to='/authors' className='mt-4 btn-secondary'>Cancel</Button>
          </Form>
      }
    </>
  );
}

export default EditAuthor;