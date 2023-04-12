import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalBook, setModalBook] = useState({});

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

  function closeModal() {
    setShowModal(false);
  }

  function showBook(book) {
    setModalBook(book);
    setShowModal(true);
  }

  return (
    <div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {modalBook.title}
          </div>
          <div>
            <span className='text-muted'>by {modalBook.author.title} {modalBook.author.first_name} {modalBook.author.middle_name} {modalBook.author.last_name}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>

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
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author.title} {book.author.first_name} {book.author.middle_name} {book.author.last_name}</td>
                    <td>
                      <Button variant='outline-primary' onClick={(e) => showBook(book)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ cursor: 'pointer' }} />
                      </Button>
                    </td>
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