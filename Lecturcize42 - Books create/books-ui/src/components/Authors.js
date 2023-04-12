import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Row, Col, Button, Alert } from 'react-bootstrap';
import AuthorEntry from './Authors/AuthorEntry';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({message: '', type: ''});

  useEffect(() => {
    getAuthors();
  }, []);

  function getAuthors() {
    setIsLoading(true);

    axios.get('/authors')
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleDeleteClick(e, authorId) {
    e.preventDefault();

    if (window.confirm('Are you sure you want to delete this author?')) {
      axios.delete('/authors/' + authorId)
        .then(results => {
          setAlert({ message: 'Author successfully deleted.', type: 'success' });
          setAuthors(prev => prev.filter(author => author.id !== authorId));
        })
        .catch(error => {
          setAlert({ message: 'Failed to delete author.', type: 'danger' });
          console.log(error);
        });
    }
  }

  return (
    <div>
      <div>
        {alert.message ? <Alert className='text-center' variant={alert.type} onClose={() => setAlert({message: '', type: ''})} dismissible>{alert.message}</Alert> : null}

        <Row>
          <Col>
            <h3>Authors</h3>
          </Col>
          <Col className='text-end'>
            <Link to={'/authors/new'}>
              <Button className='btn-primary'>
                Add Author
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
      {isLoading === true ?
        <p>Loading...</p>
      :
        <>
          {authors.length > 0 ?
            <Table striped bordered hover className='mt-3'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {authors.map(author => (
                  <AuthorEntry key={author.id} author={author} deleteHandler={handleDeleteClick}></AuthorEntry>
                ))}
              </tbody>
            </Table>
          :
            <p>No authors available.</p>
          }
        </>
      }
    </div>
  );
}

export default Authors;