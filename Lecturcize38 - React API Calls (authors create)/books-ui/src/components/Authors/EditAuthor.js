import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

import Loading from '../Loading';
import AuthorForm from './AuthorForm';

function EditAuthor() {
  const params = useParams();
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
          <AuthorForm author={author} />
      }
    </>
  );
}

export default EditAuthor;