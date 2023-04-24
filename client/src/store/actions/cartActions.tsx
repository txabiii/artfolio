import { CartItem } from "@root/utils/interfaces"

export const addToCart = (item: CartItem) => ({
  type: 'ADD_TO_CART',
  payload: item,
})

export const removeFromCart = (productId: number) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
})

export const emptyCart ={
  type: 'EMPTY_CART'
}