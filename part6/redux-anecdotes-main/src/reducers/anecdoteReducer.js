import anecdotesService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ANECDOTES":
      return action.data;
    case "VOTE":
      const updatedAnecdote = action.data;
      return state.map((a) =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote
      );
    case "CREATE":
      const newAnecdote = action.data;
      return [...state, newAnecdote];
    default:
      return state;
  }
};

export const voteForAnecdote = (anecdote) => {
  return {
    type: "VOTE",
    data: anecdote,
  };
};

export const appendAnecdote = (anecdote) => {
  return {
    type: "CREATE",
    data: anecdote,
  };
};

export const setAnecdotes = (anecdotes) => {
  return {
    type: "SET_ANECDOTES",
    data: anecdotes,
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.create(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const updateAnecdote = (id, anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.update(id, anecdote);
    dispatch(voteForAnecdote(updatedAnecdote));
  };
};

export default reducer;
