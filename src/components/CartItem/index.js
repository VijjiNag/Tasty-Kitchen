import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import './index.css'

const CartItem = props => {
  const {
    cartItemDetails,
    removeCartItem,
    incrementCartItem,
    decrementCartItem,
  } = props
  const {id, imageUrl, cost, quantity, name} = cartItemDetails
  const totalPrice = quantity * cost

  const onClickRemoveCartItem = () => {
    removeCartItem(id)
  }

  const onClickIncrementCartItemQuantity = () => {
    incrementCartItem(id)
  }

  const onClickDecrementCarItemQuantity = () => {
    decrementCartItem(id)
  }
  return (
    <div>
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
    </div>
  )
}
export default CartItem
