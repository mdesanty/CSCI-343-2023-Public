import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthorForm from './AuthorForm';

function NewAuthor() {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/authors' }}>
          Authors
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          New
        </Breadcrumb.Item>
      </Breadcrumb>

      <AuthorForm />
    </>
  );
}

export default NewAuthor;