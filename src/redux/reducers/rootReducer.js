import { combineReducers } from "redux";
import UserReducer from "./user";
import CategoriesReducer from "./categories";
import TagsReducer from "./tags";
import CartReducer from "./cart";
import AddressReducer from "./address";
import OrderReducer from "./order";

export default combineReducers({
  users: UserReducer,
  categories: CategoriesReducer,
  tags: TagsReducer,
  cart: CartReducer,
  address: AddressReducer,
  order: OrderReducer,
});
