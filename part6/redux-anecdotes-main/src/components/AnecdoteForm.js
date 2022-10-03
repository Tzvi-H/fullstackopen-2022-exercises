import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";

    dispatch(createAnecdote(content));
    dispatch(setNotification(`created anecdote "${content}"`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 3500);
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

export default AnecdoteForm;
