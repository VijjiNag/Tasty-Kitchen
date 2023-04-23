import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {GoThreeBars} from 'react-icons/go'
import CartContext from '../../context/CartContext'
import './index.css'

class Header extends Component {
  renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartItemsCount}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  onClickBurger = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }))
  }

  onChangenavBarMobile = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  Modal = () => (
    <Popup
      trigger={
        <button className="hamburger-icon-btn" type="button">
          <GoThreeBars className="hamburger-icon" />
        </button>
      }
      modal
      nested
    >
      {close => (
        <div className="modal">
          <button type="button" className="close" onClick={close}>
            &times;
          </button>
          <div className="content">
            <ul className="nav-links-container-mobile">
              <li>
                <Link className="nav-link-mobile" to="/">
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
            <button
              onClick={this.onClickLogout}
              type="button"
              className="logout-btn-mobile"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </Popup>
  )

  render() {
    const onClickLogout = () => {
      const {history} = this.props

      Cookies.remove('jwt_token')
      history.replace('/login')
    }
    return (
      <nav className="nav-container">
        <ul className="nav-links-list-container">
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
            <li onClick={this.onClickHome}>
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
            <button
              onClick={onClickLogout}
              type="button"
              className="logout-btn"
            >
              Logout
            </button>
            {this.Modal()}
          </div>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
