const initialState = [];

const categories = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_CATEGORIES":
      return action.data;
    default:
      return state;
  }
};

export default categories;
