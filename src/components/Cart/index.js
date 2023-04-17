import {Component} from 'react'
import Header from '../Header'
import CartListView from '../CartListView'
import CartEmptyView from '../CartEmptyView'
import Footer from '../Footer'
import './index.css'

class Cart extends Component {
  state = {
    cartList: JSON.parse(localStorage.getItem('cartData')),
  }

  render() {
    const {cartList} = this.state
    const showEmptyView = cartList.length === 0
    localStorage.setItem('cartData', JSON.stringify(cartList))

    return (
      <>
        <Header />
        <>
          {showEmptyView ? (
            <CartEmptyView />
          ) : (
            <>
              <CartListView />
            </>
          )}
        </>
        <Footer />
      </>
    )
  }
}
export default Cart
