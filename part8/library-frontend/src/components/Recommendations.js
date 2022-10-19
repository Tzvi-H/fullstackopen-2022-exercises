import { ME, ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Recommendations = (props) => {
  const resultForMe = useQuery(ME);
  const resultForBooks = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (resultForMe.loading || resultForBooks.loading) {
    return <div>loading...</div>;
  }

  const favouriteGenre = resultForMe.data.me.favouriteGenre;

  const booksByFavouriteGenre = resultForBooks.data.allBooks.filter((book) =>
    book.genres.includes(favouriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <strong>{favouriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByFavouriteGenre.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
