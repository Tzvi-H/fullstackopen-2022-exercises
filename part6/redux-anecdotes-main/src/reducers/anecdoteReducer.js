import anecdotesService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ANECDOTES":
      return action.data;
    case "VOTE":
      // const anecdote = state.find((a) => a.id === action.data.id);
      // const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      // return state.map((a) => (a.id !== action.data.id ? a : newAnecdote));
      break;
    case "CREATE":
      const newAnecdote = action.data;
      return [...state, newAnecdote];
    default:
      return state;
  }
};

export const voteForAnecdote = (id) => {
  return {
    type: "VOTE",
    data: {
      id,
    },
  };
};

export const createAnecdote = (anecdote) => {
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

export default reducer;
