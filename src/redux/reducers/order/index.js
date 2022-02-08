const initialState = [];

const order = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ORDER":
      return action.data;
    case "RESET_ORDER":
      return initialState;
    default:
      return state;
  }
};

export default order;
