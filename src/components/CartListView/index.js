import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import CartItem from '../CartItem'
import OrderedPage from '../OrderedPage'
import './index.css'

class CartListView extends Component {
  state = {
    isOrdered: false,
    cartList: JSON.parse(localStorage.getItem('cartData')),
  }

  onClickRemoveAllCartItems = () => {
    const {cartList} = this.state
    this.setState({cartList: []})
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  onClickPlaceOrderItems = () => {
    this.setState({isOrdered: true})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredData = cartList.filter(eachCartItem => eachCartItem.id !== id)
    this.setState({cartList: filteredData})
  }

  incrementCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updateQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updateQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          if (eachCartItem.quantity > 1) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
        }
        return eachCartItem
      }),
    }))
  }

  render() {
    const {isOrdered, cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    let total = 0
    cartList.forEach(eachCartItem => {
      total += eachCartItem.cost * eachCartItem.quantity
    })
    return (
      <>
        {isOrdered ? (
          <OrderedPage />
        ) : (
          <>
            <ul className="cart-list">
              {cartList.map(eachList => (
                <CartItem
                  cartItemDetails={eachList}
                  incrementCartItem={this.incrementCartItem}
                  decrementCartItem={this.decrementCartItem}
                  key={eachList.id}
                  removeCartItem={this.removeCartItem}
                />
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
                  onClick={this.onClickPlaceOrderItems}
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
  }
}
export default CartListView
