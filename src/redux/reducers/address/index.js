const initialState = [];

const address = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_ADDRESS":
      return action.data;
    case "RESET_ADDRESS":
      return initialState;
    default:
      return state;
  }
};

export default address;
