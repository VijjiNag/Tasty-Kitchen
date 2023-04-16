import {Link} from 'react-router-dom'
import './index.css'

const CartEmptyView = () => (
  <div className="empty-view-container">
    <img
      className="cart-empty-image"
      src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1681439616/cooking_1_dui88l.png"
      alt="empty cart"
    />
    <h1 className="empty-head">No Orders Yet!</h1>
    <p className="cart-desc">Your cart is empty. Add something from the menu</p>
    <Link className="order-link" to="/">
      <button type="button" className="order-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)
export default CartEmptyView
