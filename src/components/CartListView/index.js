import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import CartItem from '../CartItem'
import OrderedPage from '../OrderedPage'
import CartContext from '../../context/CartContext'
import './index.css'

class CartListView extends Component {
  state = {
    isOrdered: false,
  }

  onClickPlaceOrderItems = () => {
    this.setState({isOrdered: true})
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const {isOrdered} = this.state
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
                  <ul className="cart-list" testid="cartItem">
                    {cartList.map(eachList => (
                      <CartItem cartItemDetails={eachList} key={eachList.id} />
                    ))}
                  </ul>
                  <hr className="divide-line" />
                  <div className="cart-summary-container">
                    <h1 className="order">Order Total:</h1>
                    <div className="order-container">
                      <div className="price-container">
                        <BiRupee className="rupee-icon-summary" />
                        <p className="total-cost" testid="total-price">
                          {total}
                        </p>
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
        }}
      </CartContext.Consumer>
    )
  }
}
export default CartListView
