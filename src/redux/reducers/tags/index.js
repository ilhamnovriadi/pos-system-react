const initialState = [];

const tags = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_TAGS":
      return action.data;
    default:
      return state;
  }
};

export default tags;
