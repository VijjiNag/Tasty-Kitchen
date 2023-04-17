import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillCheckCircle} from 'react-icons/ai'
import './index.css'

class OrderedPage extends Component {
  state = {
    cartList: JSON.parse(localStorage.getItem('cartData')),
  }

  onClickGoToHomePage = () => {
    const {history} = this.props
    history.replace('/')
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
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
            onClick={this.onClickGoToHomePage}
            className="go-to-home-page-btn"
            type="button"
          >
            Go To Home Page
          </button>
        </Link>
      </div>
    )
  }
}
export default OrderedPage
