import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {id, imageUrl, cost, quantity, name} = cartItemDetails
      const totalPrice = quantity * cost

      const onClickRemoveCartItem = () => {
        removeCartItem(id)
      }

      const onClickIncrementCartItemQuantity = () => {
        incrementCartItemQuantity(id)
      }

      const onClickDecrementCarItemQuantity = () => {
        decrementCartItemQuantity(id)
      }
      return (
        <li className="food-cart-item">
          <div className="food">
            <img className="food-item-image" src={imageUrl} alt="" />
            <div className="food-details-container">
              <h1 className="food-name">{name}</h1>
              <div className="qty-mobile">
                <button
                  onClick={onClickDecrementCarItemQuantity}
                  type="button"
                  className="cart-qty-btn"
                >
                  <BsDashSquare />
                </button>
                <p className="cart-quantity">{quantity}</p>
                <button
                  onClick={onClickIncrementCartItemQuantity}
                  type="button"
                  className="cart-qty-btn"
                >
                  <BsPlusSquare />
                </button>
              </div>
              <div className="price-mobile">
                <BiRupee className="cart-item-total-price-icon" />
                <p className="total-price">{totalPrice}</p>
              </div>
              <button
                onClick={onClickRemoveCartItem}
                type="button"
                className="d-btn-mobile"
              >
                <MdDelete className="delete-icon" />
              </button>
            </div>
          </div>
          <div className="cart-qty-container">
            <button
              onClick={onClickDecrementCarItemQuantity}
              type="button"
              className="cart-qty-btn"
            >
              <BsDashSquare />
            </button>
            <p className="cart-quantity">{quantity}</p>
            <button
              onClick={onClickIncrementCartItemQuantity}
              type="button"
              className="cart-qty-btn"
            >
              <BsPlusSquare />
            </button>
          </div>
          <div className="cart-item-price-container">
            <BiRupee className="cart-item-total-price-icon" />
            <p className="total-price">{totalPrice}</p>
          </div>
          <button
            onClick={onClickRemoveCartItem}
            type="button"
            className="delete-btn"
          >
            <MdDelete className="delete-icon" />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
