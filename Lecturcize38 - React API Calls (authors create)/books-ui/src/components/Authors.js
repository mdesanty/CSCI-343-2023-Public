import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Row, Col, Button } from 'react-bootstrap';
import AuthorEntry from './Authors/AuthorEntry';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div>
      <div>
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
                  <AuthorEntry key={author.id} author={author}></AuthorEntry>
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