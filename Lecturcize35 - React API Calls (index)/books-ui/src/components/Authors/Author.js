function Author(props) {
  return (
    <tr>
      <td>{props.author.id}</td>
      <td>{props.author.title}</td>
      <td>{props.author.first_name}</td>
      <td>{props.author.middle_name}</td>
      <td>{props.author.last_name}</td>
    </tr>
  );
}

export default Author;