import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    setIsLoading(true);

    axios.get('/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
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
            <h3>Books</h3>
          </Col>
          <Col className='text-end'>
            <Link to={'/books/new'}>
              <Button className='btn-primary'>
                Add Book
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
      {isLoading === true ?
        <p>Loading...</p>
      :
        <>
          {books.length > 0 ?
            <Table striped bordered hover className='mt-3'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author.title} {book.author.first_name} {book.author.middle_name} {book.author.last_name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          :
            <p>No books available.</p>
          }
        </>
      }
    </div>
  );
}

export default Books;