const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ANECDOTES":
      return action.data;
    case "VOTE":
      const anecdote = state.find((a) => a.id === action.data.id);
      const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((a) => (a.id !== action.data.id ? a : newAnecdote));
    case "CREATE":
      const newNote = action.data;
      return [...state, newNote];
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

export const createAnecdote = (content) => {
  return {
    type: "CREATE",
    data: {
      content,
      id: null,
      votes: 0,
    },
  };
};

export const setAnecdotes = (anecdotes) => {
  return {
    type: "SET_ANECDOTES",
    data: anecdotes,
  };
};

export default reducer;
