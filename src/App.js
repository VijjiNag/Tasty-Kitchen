import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import RestaurantItemDetails from './components/RestaurantItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import CartContext from './context/CartContext'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  componentDidMount() {
    const data = this.getDataFromLocalStorage()
    this.setState({cartList: data})
  }

  getDataFromLocalStorage = () => {
    const parsedData = JSON.parse(localStorage.getItem('cart_items'))
    if (parsedData === null) {
      return []
    }
    return parsedData
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
    localStorage.setItem('cart_items', JSON.stringify(cartList))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    }
    localStorage.setItem('cart_items', JSON.stringify(cartList))
  }

  removeCartItem = id => {
    const data = JSON.parse(localStorage.getItem('cart_items'))
    const updatedCartList = data.filter(eachCartItem => eachCartItem.id !== id)
    this.setState({cartList: updatedCartList})
    localStorage.setItem('cart_items', JSON.stringify(updatedCartList))
  }

  addCartItem = item => {
    const {cartList} = this.state
    const itemObject = cartList.find(
      eachCartItem => eachCartItem.id === item.id,
    )

    if (itemObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (itemObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + item.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, item]
      localStorage.setItem('cart_items', JSON.stringify(updatedCartList))

      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurants-list/:id"
            component={RestaurantItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/bad-path" component={NotFound} />
          <Redirect to="bad-path" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
