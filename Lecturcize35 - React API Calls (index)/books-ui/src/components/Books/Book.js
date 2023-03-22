function Book(props) {
  const authorString = [props.book.author.title, props.book.author.first_name, props.book.author.middle_name, props.book.author.last_name].join(' ');

  return (
    <tr>
      <td>{props.book.id}</td>
      <td>{props.book.title}</td>
      <td>{authorString}</td>
    </tr>
  );
}

export default Book;