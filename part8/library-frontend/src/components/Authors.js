import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  const [changeAuthor] = useMutation(EDIT_AUTHOR);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  const submitForm = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const setBornTo = Number(event.target.born.value);

    changeAuthor({ variables: { name, setBornTo } });

    event.target.born.value = "";
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {props.token && (
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submitForm}>
            <div>
              <select name="name">
                {authors.map((author) => (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              born
              <input name="born" />
            </div>
            <input type="submit" value="update author" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Authors;
