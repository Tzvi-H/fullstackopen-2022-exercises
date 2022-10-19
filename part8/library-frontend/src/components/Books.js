import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("");

  const resultFilteredBooks = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
    fetchPolicy: "no-cache",
  });

  if (!props.show) {
    return null;
  }

  if (result.loading || resultFilteredBooks.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const filteredBooks = resultFilteredBooks.data.allBooks;
  // genre === "all"
  //   ? books
  //   : books.filter((book) => book.genres.includes(genre));

  const allGenres = [...new Set(books.map((book) => book.genres).flat())];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
