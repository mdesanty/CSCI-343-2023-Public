import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

function Songs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get('/songs')
      .then(results => {
        setSongs(results.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Table striped bordered hover className='mt-3'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
          {songs.map(song => (
            <tr key={song.id}>
              <td>{song.id}</td>
              <td>{song.name}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default Songs;