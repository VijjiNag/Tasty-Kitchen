import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import RestaurantItemDetails from './components/RestaurantItemDetails'
import CartContext from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import './App.css'

const cartListData = []

class App extends Component {
  state = {
    cartList: cartListData,
    isOrdered: false,
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredData = cartList.filter(eachList => eachList.id !== id)
    this.setState({cartList: filteredData})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updateQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updateQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          if (eachCartItem.quantity > 1) {
            const updateQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updateQuantity}
          }
        }
        return eachCartItem
      }),
    }))
  }

  onClickPlaceOrder = () => {
    this.setState({isOrdered: true})
  }

  onClickGoToHome = () => {
    this.setState({cartList: []})
  }

  getDataFromLocalStorage = () => {
    const parsedData = JSON.parse(localStorage.getItem('cartData'))
    if (parsedData === null) {
      return []
    }
    return parsedData
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
      cartListData.push(item)
      localStorage.setItem('cartData', JSON.stringify(cartListData))

      const data = this.getDataFromLocalStorage()

      this.setState({cartList: data})
    }
  }

  render() {
    const {cartList, isOrdered} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList: this.getDataFromLocalStorage(),
          isOrdered,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          onClickPlaceOrder: this.onClickPlaceOrder,
          onClickGoToHome: this.onClickGoToHome,
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
          <Route pat="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" component={NotFound} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
