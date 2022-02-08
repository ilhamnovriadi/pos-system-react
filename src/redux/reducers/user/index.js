const initialState = {
  userData: {},
  token: "",
  isFetching: false,
  isError: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return Object.assign({}, state, {
        isFetching: true,
        userData: {},
        isError: false,
      });
    case "FETCHED_USER":
      return Object.assign({}, state, {
        userData: action.data,
        isFetching: false,
        isError: false,
      });
    case "FETCHED_TOKEN":
      return Object.assign({}, state, {
        token: "Bearer " + action.data,
      });
    case "RECEIVE_ERROR":
      return Object.assign({}, state, {
        isError: true,
        isFetching: false,
      });
    case "DID_LOGOUT":
      return { ...state, isFetching: true, isError: false };
    case "SUCCESS_LOGOUT":
      return {
        userData: {},
        token: "",
        isFetching: false,
        isError: false,
      };
    case "FAILED_LOGOUT":
      return {
        userData: {},
        token: "",
        isFetching: false,
        isError: false,
      };
    default:
      return state;
  }
};

export default user;
