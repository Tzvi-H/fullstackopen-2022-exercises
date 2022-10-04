import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

import { connect } from "react-redux";

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";

    createAnecdote(content);
    setNotification(`created anecdote "${content}"`, 3.5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const ConnectedAnecdoteForm = connect(null, {
  createAnecdote,
  setNotification,
})(AnecdoteForm);

export default ConnectedAnecdoteForm;
