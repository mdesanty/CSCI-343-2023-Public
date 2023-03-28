import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Author(props) {
  return (
    <tr>
      <td>{props.author.id}</td>
      <td>{props.author.title}</td>
      <td>{props.author.first_name}</td>
      <td>{props.author.middle_name}</td>
      <td>{props.author.last_name}</td>
      <td>
        <Link to={'/authors/' + props.author.id + '/edit'}>
          <Button className='btn-secondary'>
            <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} />
          </Button>
        </Link>
      </td>
    </tr>
  );
}

export default Author;