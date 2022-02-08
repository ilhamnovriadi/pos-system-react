const initialState = {
  data: [],
  isFetching: false,
  isError: false,
};
const cart = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CART":
      return {
        ...state,
        isFetching: true,
        isError: false,
      };

    case "GET_CART":
      return {
        data: action.data,
        isFetching: false,
        isError: false,
      };
    case "ADD_CART":
      return { ...state, data: [...state.data, action.data] };
    case "ADD_CART_INC":
      const existProduct = state.data.find(
        (item) => item._id === action.data._id
      );
      const someProduct = state.data.filter(
        (item) => item._id !== action.data._id
      );
      return {
        ...state,
        data: [...someProduct, { ...existProduct, qty: existProduct.qty + 1 }],
      };
    case "POST_CART":
      return {
        data: [],
        isFetching: true,
        isError: false,
      };
    case "INC_PRODUCT":
      let tempcartInc = state.data.map((item) => {
        if (item._id === action.data) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      return { ...state, data: tempcartInc };
    case "DEC_PRODUCT":
      let tempcartDec = state.data.map((item) => {
        if (item._id === action.data) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      });
      return { ...state, data: tempcartDec };
    case "REMOVE_CART":
      return {
        ...state,
        data: state.data.filter((item) => item._id !== action.data),
      };
    case "RESET_CART":
      return initialState;
    default:
      return state;
  }
};

export default cart;
