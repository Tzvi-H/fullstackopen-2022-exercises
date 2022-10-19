import { useState } from "react";

import { useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token") || null
  );

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      {token && <NewBook show={page === "add"} setPage={setPage} />}
    </div>
  );
};

export default App;
