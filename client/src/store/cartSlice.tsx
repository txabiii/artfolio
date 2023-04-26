import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "@root/utils/interfaces";

interface QuantityChangePayload {
  productId: number;
  increment: boolean;
}

interface setQuantityPayload {
  productId: number;
  newQuantity: number | null;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [] as CartItem[]
  },
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product.product_id === newItem.product.product_id
      )

      if(existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += 1;
      } else {
        const newCartItem: CartItem = { ...newItem, quantity: 1}
        state.cartItems.push(newCartItem)
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      console.log('removed')
      const productIdToRemove = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item.product.product_id !== productIdToRemove
      )
    },
    clearCart: (state) => {
      state.cartItems = [] as CartItem[]
    },
    changeQuantity: (state, action: PayloadAction<QuantityChangePayload>) => {
      const { productId, increment } = action.payload;

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product.product_id === productId
      )

      if(existingItemIndex === -1) return;

      if(increment) {
        state.cartItems[existingItemIndex].quantity += 1;
        state.cartItems[existingItemIndex].displayed_quantity = (state.cartItems[existingItemIndex].quantity).toString();
      } else {
        state.cartItems[existingItemIndex].quantity -= 1;
        state.cartItems[existingItemIndex].displayed_quantity = (state.cartItems[existingItemIndex].quantity).toString();
        if(state.cartItems[existingItemIndex].quantity === 0) state.cartItems.splice(existingItemIndex, 1);
      }
    },
    setQuantity: (state, action: PayloadAction<setQuantityPayload>) => {
      const { productId, newQuantity } = action.payload;

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product.product_id === productId
      )

      if(existingItemIndex === -1) return;
      
      if(newQuantity) {
        state.cartItems[existingItemIndex].quantity = newQuantity
        state.cartItems[existingItemIndex].displayed_quantity = (state.cartItems[existingItemIndex].quantity).toString();
      } else {
        state.cartItems[existingItemIndex].quantity = 0;
        state.cartItems[existingItemIndex].displayed_quantity = ''
      }

      if(newQuantity) {
        if(newQuantity < 0) state.cartItems.splice(existingItemIndex, 1);
      }
    }
  },
});

export default cartSlice;