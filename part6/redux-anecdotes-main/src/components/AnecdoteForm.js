import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";

    dispatch(createAnecdote(content));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <input name="content" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
