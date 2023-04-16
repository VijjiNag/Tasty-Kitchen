import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  onClickPlaceOrder: () => {},
  onClickGoToHome: () => {},
  getDataFromLocalStorage: () => {},
})

export default CartContext
