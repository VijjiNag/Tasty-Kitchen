import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'
import OrderedPage from '../OrderedPage'
import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems, onClickPlaceOrder, isOrdered} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })
      const onClickRemoveAllCartItems = () => {
        removeAllCartItems()
      }
      const onClickPlaceOrderItems = () => {
        onClickPlaceOrder()
      }
      return (
        <>
          {isOrdered ? (
            <OrderedPage />
          ) : (
            <>
              <div className="btn-container">
                <button
                  onClick={onClickRemoveAllCartItems}
                  type="button"
                  className="remove-all-btn"
                >
                  Remove All
                </button>
              </div>
              <ul className="cart-list">
                {cartList.map(eachList => (
                  <CartItem cartItemDetails={eachList} key={eachList.id} />
                ))}
              </ul>
              <hr className="divide-line" />
              <div className="cart-summary-container">
                <p className="order">Order Total:</p>
                <div className="order-container">
                  <div className="price-container">
                    <BiRupee className="rupee-icon-summary" />
                    <p className="total-cost">{total}</p>
                  </div>
                  <button
                    onClick={onClickPlaceOrderItems}
                    type="button"
                    className="placer-order-btn"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartListView
