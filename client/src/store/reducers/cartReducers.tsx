import { CartItem } from "@root/utils/interfaces";

interface CartAction {
  type: string;
  payload?: any;
}

export const cartReducer = (state: CartItem[], action: CartAction) => {
  const { type } = action;

  switch(type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(cartItem => cartItem.product.product_id !== action.payload);
    case 'EMPTY_CART':
      return [];
    default: 
      return state;
  }
}