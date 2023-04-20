import {Component} from 'react'
import Header from '../Header'
import CartListView from '../CartListView'
import CartEmptyView from '../CartEmptyView'
import Footer from '../Footer'
import CartContext from '../../context/CartContext'
import './index.css'

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const showEmptyView = cartList.length === 0
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
        }}
      </CartContext.Consumer>
    )
  }
}
export default Cart
