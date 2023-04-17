import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {GoThreeBars} from 'react-icons/go'
import './index.css'

class Header extends Component {
  state = {
    cartList: JSON.parse(localStorage.getItem('cartData')),
  }

  renderCartItemsCount = () => {
    const {cartList} = this.state
    const cartItemsCount = cartList.length
    return (
      <>
        {cartItemsCount > 0 ? (
          <span className="cart-count-badge">{cartItemsCount}</span>
        ) : null}
      </>
    )
  }

  render() {
    const {cartList} = this.state
    const onClickLogout = () => {
      const {history} = this.props

      Cookies.remove('jwt_token')
      history.replace('/login')
    }
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <nav className="nav-container">
        <Link className="logo-link" to="/">
          <div className="nav-logo-container">
            <img
              className="web-logo"
              src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1681293595/Vector_klhk0p.png"
              alt="website logo"
            />
            <h1 className="nav-head">Tasty Kitchen</h1>
          </div>
        </Link>
        <div className="nav-links-container">
          <ul className="nav-links-list-container">
            <li>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/cart">
                Cart
                {this.renderCartItemsCount()}
              </Link>
            </li>
          </ul>
          <button onClick={onClickLogout} type="button" className="logout-btn">
            Logout
          </button>
          <button type="button" className="hamburger-icon-btn">
            <GoThreeBars className="hamburger-icon" />
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
