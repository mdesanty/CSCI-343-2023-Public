import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
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
      <h3>Authors</h3>
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