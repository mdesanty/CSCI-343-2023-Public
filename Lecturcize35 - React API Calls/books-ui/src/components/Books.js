import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Book from './Books/Book';

function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    setIsLoading(true);

    axios.get('/books')
      .then((response) => {
        setBooks(response.data);
        setIsLoading(false);
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
      <h3>Books</h3>
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
                  <Book key={book.id} book={book}></Book>
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

export default Books;