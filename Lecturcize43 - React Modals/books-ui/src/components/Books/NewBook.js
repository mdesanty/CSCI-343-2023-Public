import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NewBook() {
  const [formData, setFormData] = useState({title: '', author_id: ''});
  const [authors, setAuthors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/authors')
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleSubmit(e) {
    setIsSubmitting(true);
    console.log(formData);
    e.preventDefault();

    axios.post('/books/', formData)
      .then(response => {
        alert('Book successfully created');
        navigate('/books');
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <>
      <Form id='book-form' className='mt-3 w-50'>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' value={formData.title} placeholder='Enter title' onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        </Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Select onChange={(e) => setFormData({ ...formData, author_id: e.target.value })}>
          <option key = 'blankChoice' hidden value>Select author</option>
          {authors.map((author) => {
            return <option key={author.id} value={author.id}>{author.title} {author.first_name} {author.middle_name} {author.last_name}</option>
          })}
        </Form.Select>
        <Form.Group className='mt-4'>
          <Button className='btn-primary me-2' onClick={!isSubmitting ? handleSubmit : null}>Save</Button>
          <Button as={Link} to='/books' className='btn-secondary'>Cancel</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default NewBook;