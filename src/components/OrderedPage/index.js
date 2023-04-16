import {Link} from 'react-router-dom'
import {AiFillCheckCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const OrderedPage = () => (
  <CartContext.Consumer>
    {value => {
      const {onClickGoToHome} = value
      const onClickGoToHomePage = () => {
        onClickGoToHome()
      }
      return (
        <div className="order-page-container">
          <AiFillCheckCircle className="success" />
          <h1 className="success-head">Payment Successful</h1>
          <p className="success-desc">
            Thank you for ordering
            <br />
            Your payment is successfully completed.
          </p>
          <Link to="/">
            <button
              onClick={onClickGoToHomePage}
              className="go-to-home-page-btn"
              type="button"
            >
              Go To Home Page
            </button>
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default OrderedPage
