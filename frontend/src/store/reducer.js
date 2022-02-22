import STORE_CONST from "./store-const";
export const initialState = {
  basket: [],
  user: null,
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.count + amount, 0);

export const getBasketItemsSum = (basket) =>
  basket?.reduce((sum, item) => (sum = item.count + sum), 0);

export const filteredBasket = (basket) => {
  return basket.reduce((result, currentItem) => {
    if (!result.find((item) => item.id === currentItem.id)) {
      result.push(currentItem);
    } else {
      result.forEach((item) => {
        item.id === currentItem.id && item.count++;
      });
    }
    return result;
  }, []);
};

const reducer = (state, action) => {
  console.log(action, '>>>>>  ACTION IN REDUCER');
  let newBasket = [];
  switch (action.type) {
    case STORE_CONST.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case STORE_CONST.ADD_NEW_ITEM_TO_BASKET:
      return {
        ...state,
        basket: action.newBasket,
      };
    case STORE_CONST.ADD_ITEM_FROM_BASKET:
      newBasket = state.basket.map((item) => {
        item.id === action.id && item.count++;
        return item;
      });
      return {
        ...state,
        basket: newBasket,
      };
    case STORE_CONST.REMOVE_ITEM_FROM_BASKET:
      newBasket = state.basket.map((item) => {
        item.id === action.id && item.count--;
        return item;
      });
      return {
        ...state,
        basket: newBasket,
      };
    case STORE_CONST.REMOVE_ALL_ITEMS_FROM_BASKET:
      newBasket = state.basket.filter((item) => item.id !== action.id);
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default reducer;
